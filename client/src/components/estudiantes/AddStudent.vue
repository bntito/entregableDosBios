<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div class="form">
        <h2 class="formTittle">
            Registro de Estudiante
        </h2>
        <form @submit.prevent="saveStudent()">
            <div class="code">
                <label for="studentCourse">Inscribirse a curso</label>
                <select v-model="regE.course" id="studentCourse">
                    <option value="">Seleccionar curso</option>
                    <option v-for="course in courses" :key="course.id" :value="course.name">{{ course.name }}</option>
                </select>
            </div>
            <div class="formInput">
                <div>
                    <label for="studentDni">Número de documento (*)</label>
                    <input type="text" v-model="regE.dni" id="studentDni" placeholder="Ingrese el número de documento" required>
                </div>
                <div>
                    <label for="studentName">Nombres (*)</label>
                    <input type="text" v-model="regE.name" id="studentName" placeholder="Ingrese nombres" required>
                </div>
                <div>
                    <label for="studentLastname">Apellidos (*)</label>
                    <input type="text" v-model="regE.lastname" id="studentLastname" placeholder="Ingrese apellidos" required>
                </div>
            </div>
                <div>
                    <label for="studentAddress">Dirección (*)</label>
                    <input type="text" v-model="regE.address" id="studentAddress" placeholder="Ingrese dirección" required>
                </div>
            <div class="formInput">
                <div>
                    <label for="studentPhone">Teléfono (*)</label>
                    <input type="text" v-model="regE.phone" id="studentPhone" placeholder="Ingrese número de teléfono" required>
                </div>
                <div>
                    <label for="studentEmail">Correo electrónico (*)</label>
                    <input type="text" v-model="regE.email" id="studentEmail" placeholder="Ingrese correo electrónico" required>
                </div>
            </div>
            <div class="checkbox">
                <input type="checkbox" v-model="regE.tnc" id="studentTnC">
                <label for="studentTnC">Aceptar terminos y condiciones de la empresa</label>
            </div>
            <Message v-if="showMsg" 
                :message="message" 
                :status="processStatus"
                @blockShow="showStatus"
            />
            <div class="buttons">
                <button type="submit">{{ edit ? "Actualizar" : "Registrar" }}</button>
                <button type="button" @click="clean()">Limpiar</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Message from "../servicios/Message.vue";
import { useRouter } from "vue-router";


const router = useRouter();
const url = "http://localhost:3000/api";

let edit = false;
let message = ref("");
let showMsg = ref(false);
let processStatus = ref("");
let courses = ref([]);

let regE = ref ({
    course: "",
    dni: "",
    name: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    tnc: false,
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
    (regE.value.course = ""),
    (regE.value.dni = ""),
    (regE.value.name = ""),
    (regE.value.lastname = ""),
    (regE.value.address = ""),
    (regE.value.phone = ""),
    (regE.value.email = ""),
    (regE.value.tnc = false);
};

const saveStudent = () => {
    if (requiredFieldInc.value) {
        showError("Los campos con (*) son requeridos", "warning");
    } else {
        if (invalidEmail.value) {
            showError("El correo electrónico no es válido", "warning");
        } else {
            sendStudent();
        }
    }
};

const requiredFieldInc = computed(() => {
    const fieldInc = [
        "course",
        "dni",
        "name",
        "lastname",
        "address",
        "phone",
        "email"
    ];
    return fieldInc.some((field) => !regE.value[field]);
});

const invalidEmail = computed(() => {
    return !/^\S+@\S+\.\S+$/.test(regE.value.email);
});

const sendStudent = async () => {
    const selectedCourse = courses.value.find(course => course.name === regE.value.course);
    if (!selectedCourse) {
        showError("Curso no encontrado", "warning");
        return;
    }
    const data = {
        id: regE.value.id,
        codeCourse: selectedCourse.code,
        course: regE.value.course,
        dni: regE.value.dni,
        name: regE.value.name,
        lastname: regE.value.lastname,
        address: regE.value.address,
        phone: regE.value.phone,
        email: regE.value.email,
        tnc: regE.value.tnc,
    };
    let sendMethod = "POST";
    let api = `${url}/student`;
    console.log(data);
    await fetch(api, {
        method: sendMethod,
        headers: {
            "Content-Type": "application/json"
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
    console.error("Error al registrar el estudiante", error))
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
.buttons {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1.5rem;
}

</style>