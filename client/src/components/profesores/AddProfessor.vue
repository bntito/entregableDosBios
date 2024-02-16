<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div class="form">
        <h2 class="formTittle">
            Registro de Profesor
        </h2>
        <form @submit.prevent="saveProfessor()">
            <div class="formInput">
                <div>
                    <label for="professorCourse">Perfil del profesor</label>
                    <select v-model="regP.course" id="professorCourse">
                        <option value="">Seleccionar curso</option>
                        <option v-for="course in courses" :key="course.id" :value="course.name">{{ course.name }}</option>
                    </select>
                </div>
                <div>
                    <label for="professorCost">Costo de servicio por hora</label>
                    <input type="number" v-model="regP.cost" id="professorCost" placeholder="Ingrese costo del servicio por hora">
                </div>
            </div>
            <div class="formInput">
                <div>
                    <label for="professorDni">Número de documento (*)</label>
                    <input type="text" v-model="regP.dni" id="professorDni" placeholder="Ingrese el número de documento" required>
                </div>
                <div>
                    <label for="professorName">Nombres (*)</label>
                    <input type="text" v-model="regP.name" id="professorName" placeholder="Ingrese nombres" required>
                </div>
                <div>
                    <label for="professorLastname">Apellidos (*)</label>
                    <input type="text" v-model="regP.lastname" id="professorLastname" placeholder="Ingrese apellidos" required>
                </div>
            </div>
            <div class="formInput">
                <div>
                    <label for="professorCountry">País de residencia</label>
                    <select v-model="regP.country" id="professorCountry">
                        <option value="">Seleccione el país de residencia</option>
                        <option v-for="country in countries" :key="country.id" :value="country.pais">{{ country.pais }}</option>
                    </select>
                </div>
                <div>
                    <label for="professorAddress">Dirección (*)</label>
                    <input type="text" v-model="regP.address" id="professorAddress" placeholder="Ingrese dirección" required>
                </div>
                <div>
                    <label for="professorPhone">Teléfono (*)</label>
                    <input type="text" v-model="regP.phone" id="professorPhone" placeholder="Ingrese número de teléfono" required>
                </div>
                <div>
                    <label for="professorEmail">Correo electrónico (*)</label>
                    <input type="text" v-model="regP.email" id="professorEmail" placeholder="Ingrese correo electrónico" required>
                </div>
            </div>
            <div class="checkbox">
                <label for="professorActive">Estado de profesor</label>
                <input type="checkbox" v-model="regP.active" id="profesorActive">
            </div>
            <Message v-if="showMsg" 
                :message="message" 
                :status="processStatus"
                @blockShow="showStatus"
            />
            <div class="buttons">
                <button type="submit">{{ edit ? "Actualizar" : "Registrar" }}</button>
                <button type="button" @click="clean()"> Limpiar</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { countries } from "../profesores/UtilProfessor";
import Message from "../servicios/Message.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const url = "http://localhost:3000/api"

let edit = false;
let message = ref("");
let showMsg = ref(false);
let processStatus = ref("");
let courses = ref([]);

let regP = ref({
    course: "",
    cost: "",
    dni: "",
    name: "",
    lastname: "",
    country: "",
    address: "",
    phone: "",
    email: "",
    active: false,
});

onMounted(async () => {
    try {
        const response = await fetch (`${url}/course`);
        const data = await response.json();
        courses.value = data;
    } catch (error) {
        console.error("Error al obtener la lista de cursos", error);
    }
});

const clean = () => {
    (regP.value.course = ""),
    (regP.value.cost = ""),
    (regP.value.dni = ""),
    (regP.value.name = ""),
    (regP.value.lastname = ""),
    (regP.value.country = ""),
    (regP.value.address = ""),
    (regP.value.phone = ""),
    (regP.value.email = ""),
    (regP.value.active = false);
};

const saveProfessor = () => {
    if (requiredFieldInc.value) {
        showError("Los campos con (*) son requeridos", "warning");
    } else {
        if (invalidEmail.value) {
            showError("El correo electrónico no es válido", "warning");
        } else {
            sendProfessor();
        }
    }
};

const requiredFieldInc = computed(() => {
    const fieldInc = [
        "course",
        "cost",
        "dni",
        "name",
        "lastname",
        "country",
        "address",
        "phone",
        "email"
    ];
    return fieldInc.some((field) => !regP.value[field]);
});

const invalidEmail = computed(() => {
    return !/^\S+@\S+\.\S+$/.test(regP.value.email);
});

const sendProfessor = async () => {
    const selectedCourse = courses.value.find(course => course.name === regP.value.course);
    if(!selectedCourse) {
        showError("Curso no encontrado", "warning");
        return;
    }
    const data = {
        course: regP.value.course,
        codeCourse: selectedCourse.code,
        cost: regP.value.cost,
        id: regP.value.id,
        dni: regP.value.dni,
        name: regP.value.name,
        lastname: regP.value.lastname,
        country: regP.value.country,
        address: regP.value.address,
        phone: regP.value.phone,
        email: regP.value.email,
        active: regP.value.active,
    };
    let sendMethod = "POST";
    let api = `${url}/professor`;
    console.log(data);
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
    console.error("Error al registrar el professor", error))
};

function showError(msge, status) {
    message.value = msge;
    processStatus.value = status;
    showStatus(true);
}

const showStatus = (val) => {
    showMsg.value = val;
};

const pageBack = () => {
    router.back();
};

</script>

<style scoped>
.buttons {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1.5rem;
}

</style>