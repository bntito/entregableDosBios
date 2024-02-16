<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div class="form">
        <h2 class="formTittle">
            Registro de Curso
        </h2>
        <form @submit.prevent="saveCourse()">
            <div class="formInput">
                <div>
                    <label for="courseCode">Código del curso (*)</label>
                    <input type="text" v-model="regC.code" id="courseCode" placeholder="Ingrese el código del curso" required>
                </div>
                <div>
                    <label for="courseName">Nombre del curso (*)</label>
                    <input type="text" v-model="regC.name" id="courseName" placeholder="Ingrese el nombre del curso" required>
                </div>
            </div>
            <div>
                <label for="courseDescription">Descripción del curso</label>
                <textarea rows="2" v-model="regC.description" id="courseDescription" placeholder="Descripción del curso"></textarea>
            </div>
            <div>
                <div>
                    <label for="courseCost">Costo del curso (*)</label>
                    <input type="number" v-model="regC.cost" id="courseCost" placeholder="Ingrese costo del curso">
                </div>
            </div>
            <div class="formInput">
                <div>
                    <label for="courseStart">Fecha de inicio</label>
                    <input type="date" v-model="regC.start" id="courseStart">
                </div>
                <div>
                    <label for="courseEnd">Fecha de culminación</label>
                    <input type="date" v-model="regC.end" id="courseEnd">
                </div>
            </div>
            <div class="checkbox">
                <label for="courseActive">Curso activo</label>
                <input type="checkbox" v-model="regC.active" id="courseActive" >
            </div>
            <div>
                <Message v-if="showMsg" 
                    :message="message" 
                    :status="processStatus"
                    @blockShow="showStatus"
                />
                <div class="buttons">
                    <button type="submit">{{ edit ? "Actualizar" : "Registrar" }}</button>
                    <button type="button" @click="clean()">Limpiar</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Message from "../servicios/Message.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const url = "http://localhost:3000/api";

let edit = false;
let message = ref("");
let showMsg = ref(false);
let processStatus = ref("");

let regC = ref({
    code: "",
    name: "",
    description: "",
    cost: "",
    active: false,
    start: "",
    end: "",
});

const clean = () => {
    (regC.value.code = ""),
    (regC.value.name = ""),
    (regC.value.description = ""),
    (regC.value.cost = ""),
    (regC.value.active = false),
    (regC.value.start = ""),
    (regC.value.end = "");
};

const saveCourse = () => {
    if (requiredFieldInc.value) {
        showError("Los campos con (*) son requeridos", "warning");    
    } else if (isDateBeforeCurrent(regC.value.start) || isDateBeforeCurrent(regC.value.end)) {
        showError("La fecha no puede ser anterior al año 2024", "warning")
    } else {
        sendCourse();
    }
}

const isDateBeforeCurrent = (dateString) => {
    const date = new Date(dateString);
    const currentYear = new Date().getFullYear();
    return date.getFullYear() < currentYear;
};

const requiredFieldInc = computed(() => {
    const fieldInc = [
        "code",
        "name",
        "description",
        "cost",
        "start",
        "end",
    ];
    return fieldInc.some((field) => !regC.value[field]);
})

const sendCourse = async () => {
    const data = {
        id: regC.value.id,
        code: regC.value.code,
        name: regC.value.name,
        description: regC.value.description,
        cost: regC.value.cost,
        active: regC.value.active,
        start: regC.value.start,
        end: regC.value.end,
    };
    let sendMethod = "POST";
    let api = `${url}/course`;
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
    console.error("Error al registrar el curso", error))
};

function showError(msge, status) {
    message.value = msge;
    processStatus.value = status;
    showStatus(true);
};

const showStatus = (val) => {
    showMsg.value = val;
}

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