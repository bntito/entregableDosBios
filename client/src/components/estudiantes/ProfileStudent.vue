<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div class="form">
        <h2 v-if="isEdit" class="formTittle">Editar información del estudiante</h2>
        <h2 v-else class="formTittle">Detalle informativo del estudiante</h2>
        <p>Buscar por DNI de estudiante. Disponible</p>

        <form @submit.prevent="isSave ? saveStudent() : ''">
            <div class="code">
                <label for="studentCourse">Inscribirse a curso</label>
                <select v-model="regE.course" :disabled="!isEdit" id="studentCourse">
                    <option value="">Seleccionar curso</option>
                    <option v-for="course in courses" :key="course.id" :value="course.name">{{ course.name }}</option>
                </select>
            </div>
            <div class="formInput">
                <div>
                    <label for="studentDni">Número de documento (*)</label>
                    <br>
                    <input type="text" v-model="regE.dni" :disabled="!isEditDni" placeholder="Ingrese el número de documento"
                    @input="changeInput" @keydown="enterPress">
                </div>
                <div>
                    <label for="studentName">Nombres (*)</label>
                    <input type="text" v-model="regE.name" :disabled="!isEdit" placeholder="Ingrese nombres">
                </div>
                <div>
                    <label for="studentLastname">Apellidos (*)</label>
                    <input type="text" v-model="regE.lastname" :disabled="!isEdit" placeholder="Ingrese apellidos">
                </div>
            </div>
                <div>
                    <label for="studentAddress">Dirección (*)</label>
                    <textarea id="address" v-model="regE.address" :disabled="!isEdit" placeholder="Ingrese dirección" rows="2"></textarea>
                </div>
            <div class="formInput">
                <div>
                    <label for="studentPhone">Teléfono (*)</label>
                    <input type="text" v-model="regE.phone" :disabled="!isEdit" placeholder="Ingrese número de teléfono">
                </div>
                <div>
                    <label for="studentEmail">Correo electrónico (*)</label>
                    <input type="text" v-model="regE.email" :disabled="!isEdit" placeholder="Ingrese correo electrónico">
                </div>
            </div>
            <div class="checkbox">
                <input type="checkbox" v-model="regE.tnc" :disabled="!isEdit">
                <label for="studentTnC">Aceptar terminos y condiciones de la empresa</label>
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
                <button v-if="isEdit" :disable="!isEdit" type="button" @click="clean()">
                    Limpiar
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import Message from "../servicios/Message.vue";

const router = useRouter();
const url = "http://localhost:3000/api";

let courses = ref([]);
const route = useRoute();
let message = ref("");
let showMsg = ref(false);
let searchStudent = "";
let studentID = ref(route.params.id);

let regE = ref({
    dni: "",
    name: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    tnc: "",
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
        console.error("Error al obtener la lista de cursos", error);
    }
});

onBeforeMount(async () => {
    if (itemEd != 0) {
        isEdit.value = !isEdit.value;
    }
    if (studentID.value > 0) {
        await getStudent(studentID.value);
    }
    searchStudent = !searchStudent;
});

const getStudent = async (id) => {
    let sendMethod = "GET";
    let api = `${url}/student/${id}`;
    await fetch(api, {
        method: sendMethod,
    })
    .then((response) => response.json())
    .then((data) => {
        isEditDni.value = !isEditDni.value;
        isSave.value = true;
        regE.value = data.student;
    })
    .catch((error) =>
    console.error("Error al editar información del estudiante", error)
    );
};

const getStudentDni = async (dni) => {
    let sendMethod = "GET";
    let api = `${url}/studentdni/${dni}`;
    await fetch(api, {
        method: sendMethod,
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            isEditDni.value = false;
            processStatus.value = "success";
            regE.value = data.student;
            isSave.value = true;
        } else {
            message.value = data.message;
            alert(message.value);
            processStatus.value = "fail";
            clean();
        }
    })
    .catch((error) =>
    console.error("Error al editar información del estudiante", error)
    );
};

const clean = () => {
    (regE.value.course = ""),
    (regE.value.dni = ""),
    (regE.value.name = ""),
    (regE.value.lastname = ""),
    (regE.value.address = ""),
    (regE.value.phone = ""),
    (regE.value.email = ""),
    (regE.value.tnc = "");
};

const changeInput = (event) => {
    searchStudent = event.target.value;
};

const enterPress = (event) => {
    if (event.key == "Enter" && searchStudent) {
        getStudentDni(searchStudent);
        searchStudent = "";
    }
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
    const data = {
        id: regE.value.id ? regE.value.id : 0,
        course: regE.value.course,
        dni: regE.value.dni.trim(),
        name: regE.value.name.trim(),
        lastname: regE.value.lastname.trim(),
        address: regE.value.address.trim(),
        phone: regE.value.phone.trim(),
        email: regE.value.email.trim(),
        tnc: Boolean(regE.value.tnc),
    };

    let sendMethod = "PUT";
    let api = `${url}/student/${regE.value.id}`;
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
        if (studentID.value > 0) {
            alert(data.message);
            pageBack();
        }
        clean();
    })
    .catch((error) =>
    console.error("Error al registrar el estudiante", error)
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