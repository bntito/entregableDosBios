<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div class="form">
        <h2 v-if="isEdit" class="formTittle">Editar información del profesor</h2>
        <h2 v-else class="formTittle">Detalle informativo del profesor</h2>
        <p>Buscar por DNI de profesor. Disponible</p>

        <form @submit.prevent="isSave ? saveProfessor() : ''">
            <div class="formInput">
                <div>
                    <label for="professorCourse">Perfil del profesor</label>
                    <select v-model="regP.course" :disabled="!isEdit" id="professorCourse">
                        <option value="">Seleccionar curso</option>
                        <option v-for="course in courses" :key="course.id" :value="course.name">{{ course.name }}</option>
                    </select>
                </div>
                <div>
                    <label for="professorCost">Costo de servicio por hora</label>
                    <input type="number" v-model="regP.cost" :disabled="!isEdit" placeholder="Ingrese costo de servicio por hora">
                </div>
            </div>
            <div class="formInput">
                <div>
                    <label for="professorDni">Número de documento (*)</label>
                    <input type="text" v-model="regP.dni" :disabled="!isEdit" placeholder="Ingrese el número de documento"
                    @input="changeInput" @keydown="enterPress">
                </div>
                <div>
                    <label for="professorName">Nombres (*)</label>
                    <input type="text" v-model="regP.name" :disabled="!isEdit" placeholder="Ingrese nombres">
                </div>
                <div>
                    <label for="professorLastname">Apellidos (*)</label>
                    <input type="text" v-model="regP.lastname" :disabled="!isEdit" placeholder="Ingrese apellidos">
                </div>
            </div>
            <div class="formInput">
                <div>
                    <label for="professorCountry">País de residencia</label>
                    <select v-model="regP.country" :disabled="!isEdit">
                        <option value="">Seleccione el país de residencia</option>
                        <option v-for="country in countries" :key="country.id" :value="country.pais">{{ country.pais }}</option>
                    </select>
                </div>
                <div>
                    <label for="professorAddress">Dirección (*)</label>
                    <input type="text" v-model="regP.address" :disabled="!isEdit" placeholder="Ingrese dirección">
                </div>
                <div>
                    <label for="professorPhone">Teléfono (*)</label>
                    <input type="text" v-model="regP.phone" :disabled="!isEdit" placeholder="Ingrese número de teléfono">
                </div>
                <div>
                    <label for="professorEmail">Correo electrónico (*)</label>
                    <input type="text" v-model="regP.email" :disabled="!isEdit" placeholder="Ingrese correo electrónico">
                </div>
            </div>
            <div class="checkbox">
                <label for="professorActive">Estado de profesor</label>
                <input type="checkbox" v-model="regP.active" :disabled="!isEdit">
            </div>
            <Message v-if="showMsg" 
                :message="message" 
                :status="processStatus" 
                @blockShow="showStatus"
            />
            <div class="buttons">
                <button :type="isEdit ? 'submit' : 'button'" @click="isEdit ? null : $router.back()">
                    {{ isEdit ? "Actualizar" : "Volver" }}
                </button>
                <button v-if="isEdit" :disabled="!isEdit" type="button" @click="clean()">
                    Limpiar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onBeforeMount, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { countries } from "./UtilProfessor";
import Message from "../servicios/Message.vue";

const router = useRouter();
const url = "http://localhost:3000/api";

let courses = ref([]);
const route = useRoute();
let message = ref("");
let showMsg = ref(false);
let searchProfessor = "";
let professorID = ref(route.params.id);

let regP = ref({
    course: "",
    dni: "",
    cost: "",
    name: "",
    lastname: "",
    country: "",
    address: "",
    phone: "",
    email: "",
    active: "",
});

let isEdit = ref(1);
let isSave = ref(false);
let isEditDni = ref(true);
let itemEd = route.params.ed;
let processStatus = ref("");

onMounted(async () => {
    try {
        const response = await fetch (`${url}/course`);
        const data = await response.json();
        courses.value = data;
    } catch (error) {
        console.log("Error al obtener la lista de cursos", error);
    }
});

onBeforeMount(async () => {
    if (itemEd != 0) {
        isEdit.value = !isEdit.value;
    }
    if (professorID.value > 0) {
        await getProfessor(professorID.value);
    }
    searchProfessor = !searchProfessor;
});

const getProfessor = async (id) => {
    let sendMethod = "GET";
    let api = `${url}/professor/${id}`;
    await fetch(api, {
        method: sendMethod,
    })
    .then((response) => response.json())
    .then((data) => {
        isSave.value = true;
        regP.value = data.professor;
    })
    .catch((error) =>
    console.error("Error al editar información del profesor", error)
    );
};

const getProfessorDni = async (dni) => {
    let sendMethod = "GET";
    let api = `${url}/professordni/${dni}`;
    await fetch(api, {
        method: sendMethod,
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            isEditDni.value = false;
            processStatus.value = "success";
            regP.value = data.professor;
            isSave.value = true;
        } else {
            message.value = data.message;
            alert(message.value);
            processStatus.value = "fail";
            clean();
        }
    })
    .catch((error) => 
    console.error("Error al editar información de profesor", error)
    );
}

const clean = () => {
    (regP.value.course = ""),
    (regP.value.dni = ""),
    (regP.value.cost = ""),
    (regP.value.name = ""),
    (regP.value.lastname = ""),
    (regP.value.country = ""),
    (regP.value.address = ""),
    (regP.value.phone = ""),
    (regP.value.email  = ""),
    (regP.value.active = "");
};

const changeInput = (event) => {
    searchProfessor = event.target.value;
};

const enterPress = (event) => {
    if (event.key == "Enter" && searchProfessor) {
        getProfessorDni(searchProfessor);
        searchProfessor = "";
    }
};

const saveProfessor = () => {
    if (requiredFieldInc.value) {
        showError("Los campos con (*) son requeridos", "warning");
    } else {
        if (invalidEmail.value) {
            showError("El correo eletrónico no es válido", "warning");
        } else {
            sendProfessor();
        }
    }
};

const requiredFieldInc = computed(() => {
    const fieldInc = [
        "course",
        "dni",
        "cost",
        "name",
        "lastname",
        "country",
        "address",
        "phone",
        "email"
    ];
    return fieldInc.some((field) => !regP.value[field]);
});

const invalidEmail = computed (() => {
    return !/^\S+@\S+\.\S+$/.test(regP.value.email);
});

const sendProfessor = async () => {
    const data = {
        id: regP.value.id ? regP.value.id : 0,
        course: regP.value.course,
        dni: regP.value.dni.trim(),
        cost: regP.value.cost,
        name: regP.value.name.trim(),
        lastname: regP.value.lastname.trim(),
        country: regP.value.country,
        address: regP.value.address.trim(),
        phone: regP.value.phone.trim(),
        email: regP.value.email.trim(),
        active: Boolean(regP.value.active),
    };

    let sendMethod = "PUT";
    let api = `${url}/professor/${regP.value.id}`;
    await fetch(api, {
        method: sendMethod,
        headers: {
            "Content-Type" : "application/json",
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
        if (professorID.value > 0) {
            alert(data.message);
            pageBack();
        }
        clean();
    })
    .catch((error) =>
    console.error("Error al registrar el profesor", error)
    );
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
p {
    display: flex;
    justify-content: center;
    color: rgb(122, 122, 197);
}

.buttons {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1.5rem;
}

</style>