<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div class="frameContact">
        <div class="formContact">
            <h2 class="formTittle">Contactos</h2>
            <form @submit.prevent="saveContact()" class="InputContact">
                <input type="hidden" v-model="contact.id">
                <div>
                    <label for="email">Correo electrónico (*)</label>
                    <input type="text" v-model="contact.email">
                </div>
                <div class="formInput">
                    <div>
                        <label for="name">Nombre (*)</label>
                        <input type="text" v-model="contact.name">
                    </div>
                    <div>
                        <label for="phone">Teléfono (*)</label>
                        <input type="text" v-model="contact.phone">
                    </div>
                </div>
                <div>
                    <label for="comment">Comentario (*)</label>
                    <textarea id="comment" v-model="contact.comment" rows="3">
                    </textarea>
                </div>
                
                <Message v-if="showMsg" 
                    :message="message" 
                    :status="processStatus"
                    :duration="2000"
                    @blockShow="showStatus"
                />

                <div class="buttons">
                    <button class="btn" type="submit">Enviar</button>
                </div>
            </form>
        </div>
        <div class="comments">
            <h2>Envianos tus comentarios</h2>
            <br>
            <br>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
            </p>
            <br>
            <br>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Message from '../servicios/Message.vue';
import { useRouter } from "vue-router";

const router = useRouter();
const url = "http://localhost:3000/api"

let showMsg = ref(false);
let message = ref("");
let processStatus = ref("");
let contact = ref({
    id: 0,
    email: "",
    name: "",
    phone: "",
    comment: "",
});

const saveContact = () => {
    if (requiredFieldInc.value) {
        showError("Los campos con (*) son requeridos", "warning");
    } else {
        if (invalidEmail.value) {
            showError("El correo electrónico no es válido", "warning");
        } else {
            sendComment();
        }
    }
};

const requiredFieldInc = computed(() => {
    const fieldInc = [
        "email",
        "name",
        "phone",
        "comment",
    ];
    return fieldInc.some((field) => !contact.value[field]);
});

const invalidEmail = computed(() => {
    return !/^\S+@\S+\.\S+$/.test(contact.value.email);
});

const sendComment = async () => {
    const data = {
        id: contact.value.id,
        name: contact.value.name,
        email: contact.value.email,
        phone: contact.value.phone,
        comment: contact.value.comment,
    };
    let sendMethod = "POST";
    let api = `${url}/contact`;
    await fetch(api, {
        method: sendMethod,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        message.value = data.message;
        if (data.success) {
            processStatus.value = "success";
        } else {
            processStatus.value = "fail";
        }
        showStatus(true);
        setTimeout(() => {
            clean();
        }, 2000);
    })
    .catch((error) =>
    console.error("Error al enviar el mensaje", error))
};

const clean = () => {
    (contact.value.id = ""),
    (contact.value.email = ""),
    (contact.value.name = ""),
    (contact.value.phone = ""),
    (contact.value.comment = "");
};

function showError(msge, status) {
    message.value = msge;
    processStatus.value = status;
    showStatus(true);
};

const showStatus = (val) => {
    showMsg.value = val;
};

const pageBack = () => {
    router.back();
};

</script>

<style scoped>
.formContact {
    border: 2px solid black;
    border-radius: 8px;
}

.comments {
    width: 100%;
    padding: .8rem;
    box-sizing: border-box;
}
.buttons {
    display: flex;
    justify-content: end;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-right: 10%;
}

@media (min-width: 990px) {
    .frameContact {
        margin: 2rem auto;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .formContact {
        width: 100%;
        max-width: 40%;
        margin: 2rem;
        padding: 2rem;
    }
}

@media (max-width: 990px) {
    .frameContact {
        display: flex;
        flex-direction: column;
    }
    .formContact {
        margin: 0 3rem;
    }
    p {
        margin: 0 4rem;
    }
}

</style>