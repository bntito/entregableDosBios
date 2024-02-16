<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div class="list">
        <h2>Listado de contactos</h2>
        <div v-if="ifComm">
            <h3>Cargando...</h3>
        </div>
        <div class="searchContainer">
            <div v-if="!ifComm" class="search">
                <label for="search" class="searchIcon"><font-awesome-icon icon="magnifying-glass"/></label>
                <input type="text" v-model="searchContact" placeholder="Buscar comentario por email"
                @input="changeInput"
                @keydown="enterPress">
            </div>
            <div v-if="!ifComm" class="reloadButton">
                <button id="btnReload" @click="getContacts">
                    <font-awesome-icon icon="arrows-rotate"/>
                </button>
            </div>
        </div>
        <table v-if="!ifComm">
            <tr class="tableTittle">
                <th width="20%">Correo eletrónico</th>
                <th width="15%">Nombre</th>
                <th width="15%">Teléfono</th>
                <th width="30%">Comentario</th>
                <th colspan="2" width="2%">Acción</th>
            </tr>
            <tbody>
                <tr v-for="(contact, index) in contacts" :key="contact.email" class="listDetail">
                    <DetailContact
                        :row="index"
                        :id="contact.id"
                        :email="contact.email"
                        :name="contact.name"
                        :phone="contact.phone"
                        :comment="contact.comment"
                        @deleteCommentEmit="deleteCommentFunction"
                    />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import DetailContact from "./DetailContact.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const url = "http://localhost:3000/api";

const ifComm = ref(false);

let searchContact = "";
let message = ref("");
let show = ref(false);
let processStatus = ref("");
let contacts = ref([]);
let contact = ref({
    id: 0,
    email: "",
    name: "",
    phone: "",
    comment: "",
});

onBeforeMount(async () => {
    getContacts();
});

const getContacts = async () => {
    ifComm.value = true;
    let api = `${url}/contact`;
    await fetch(api)
    .then((response) => response.json())
    .then((data) => {
        contacts.value = data;
        ifComm.value = false;
    })
    .catch((error) => console.error("Error al cargar comentarios", error));
};

const deleteCommentFunction = async (id) => {
    let api = `${url}/contact/${id}`;
    fetch(api, {
        method: "DELETE",
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            message.value = data.message;
            processStatus.value = "success";
        } else {
            processStatus.value = "fail";
        }
        showStatus(true);
        clean();
        getContacts();
    })
    .catch((error) => {
        console.error("Error al eliminar comentario", error);
    });
};

const clean = () => {
    (contact.value.id = ""),
    (contact.value.email = ""),
    (contact.value.name = ""),
    (contact.value.phone = ""),
    (contact.value.comment = "");
};

const changeInput = (event) => {
    searchContact = event.target.value.trim();
};

const enterPress = (event) => {
    if (event.key == "Enter" && searchContact) {
        getContactEmail(searchContact);
        searchContact = "";
    }
};

const getContactEmail = async (email) => {
    let sendMethod = "GET";
    let api = `${url}/contactemail/${email}`;
    await fetch(api, {
        method: sendMethod,
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            processStatus.value = "success";
            contact.value = data;
            contacts.value = contacts.value.filter(c => c.email === email);
        } else {
            message.value = data.message;
            alert(message.value);
            processStatus.value = "fail";
            clean();
        }
    })
    .catch((error) =>
    console.error("Error al buscar comentario por email", error)
    );
};

const showStatus = (val) => {
    show.value = val;
};

const pageBack = () => {
    router.back();
};

</script>

<style scoped>
table {
    width: 100%;
}
.searchContainer {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.2rem;
}

.searchIcon {
    color: rgb(32, 240, 255);
    font-size: 1.2rem;
}
.search {
    width: 25%;
}

#btnReload {
    padding: .8rem;
    color: rgb(255, 127, 95);
    background-color: rgb(3, 24, 65);
}

#btnReload:hover {
    color: rgb(32, 240, 255);
}
.reloadButton {
    margin-top: auto;
    margin-bottom: 8px;
}

table > tbody > tr {
    height: 30px;
    background-color: rgb(92, 92, 92);
}

table > tbody > tr:hover {
    background-color: rgb(126, 126, 126);
}

</style>