<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div class="form">
        <h2 v-if="isEdit" class="formTittle">Editar información del Curso</h2>
        <h2 v-else class="formTittle">Detalle informativo del curso</h2>
        <p>Buscar por Nombre de curso. Disponible</p>

        <form @submit.prevent="isSave ? saveCourse() : ''">
            <div class="formInput">
                <div>
                    <label for="courseCode">Código del curso (*)</label>
                    <input type="text" v-model="regC.code" :disabled="!isEdit" placeholder="Ingrese el código del curso">
                </div>
                <div>
                    <label for="courseName">Nombre del curso (*)</label>
                    <input type="text" v-model="regC.name" :disabled="!isEditCourse" placeholder="Ingrese el nombre del curso"
                    @input="changeInput" @keydown="enterPress">
                </div>
            </div>
                <div>
                    <label for="courseDescription">Descripción del curso</label>
                    <input type="text" v-model="regC.description" :disabled="!isEdit" placeholder="Descripción del curso">
                </div>
                <div>
                    <label for="courseCost">Costo del curso (*)</label>
                    <textarea rows="2" v-model="regC.cost" :disabled="!isEdit" placeholder="Ingrese costo del curso"></textarea>
                </div>
            <div class="formInput">
                <div>
                    <label for="courseStart">Fecha de inicio</label>
                    <input type="date" v-model="regC.start" :disabled="!isEdit">
                </div>
                <div>
                    <label for="courseEnd">Fecha de culminación</label>
                    <input type="date" v-model="regC.end" :disabled="!isEdit">
                </div>
            </div>
            <div class="checkbox">
                <label for="courseActive">Curso activo</label>
                <input type="checkbox" v-model="regC.active" :disabled="!isEdit">
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
import { ref, computed, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import Message from "../servicios/Message.vue";

const router = useRouter();
const url = "http://localhost:3000/api";

const route = useRoute();
let message = ref("");
let showMsg = ref(false);
let searchCourse = "";
let courseID = ref(route.params.id);

let regC = ref({
    code: "",
    name: "",
    description: "",
    cost: "",
    active: "",
    start: "",
    end: "",
});

let isEdit = ref(1);
let isSave = ref(false);
let isEditCourse = ref(true);
let itemEd = route.params.ed;
let processStatus = ref("");

onBeforeMount(async () => {
    if (itemEd != 0) {
        isEdit.value = !isEdit.value;
    }
    if (courseID.value > 0) {
        await getCourse(courseID.value);
    }
    searchCourse = !searchCourse;
});

const getCourse = async (id) => {
    let sendMethod = "GET";
    let api = `${url}/course/${id}`;
    await fetch(api, {
        method: sendMethod,
    })
    .then((response) => response.json())
    .then((data) => {
        isSave.value = true;
        regC.value = data.course;
    })
    .catch((error) =>
    console.error("Error al editar información de curso", error)
    );
};

const getCourseName = async (name) => {
    let sendMethod = "GET";
    let api = `${url}/coursename/${name}`;
    await fetch(api, {
        method: sendMethod,
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            isEditCourse.value = false;
            processStatus.value = "success";
            regC.value = data.course;
            isSave.value = true;
        } else {
            message.value = data.message;
            alert(message.value);
            processStatus.value = "fail";
            clean();
        }
    })
    .catch((error) =>
    console.error("Error al editar información del curso", error)
    );
};

const clean = () => {
    (regC.value.code = ""),
    (regC.value.name = ""),
    (regC.value.description = "");
    (regC.value.cost = ""),
    (regC.value.active = ""),
    (regC.value.start = ""),
    (regC.value.end = "");
};

const changeInput = (event) => {
    searchCourse = event.target.value;
};

const enterPress = (event) => {
    if (event.key == "Enter" && searchCourse) {
        getCourseName(searchCourse);
        searchCourse = "";
    }
};

const saveCourse = () => {
    if (requiredFieldInc.value) {
        showError("Los campos con (*) son requeridos", "warning");
    } else if (isDateBeforeCurrent(regC.value.start) || isDateBeforeCurrent(regC.value.end)) {
        showError("La fecha no puede ser anterior al año 2024", "warning")
    } else {
        sendCourse();
    }
};

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
});

const sendCourse = async () => {
    const data = {
        id: regC.value.id ? regC.value.id : 0,
        code: regC.value.code.trim(),
        name: regC.value.name.trim(),
        description: regC.value.description.trim(),
        cost: regC.value.cost,
        active: Boolean(regC.value.active),
        start: regC.value.start,
        end: regC.value.end,
    };

    let sendMethod = "PUT";
    let api = `${url}/course/${regC.value.id}`;
    await fetch(api, {
        method: sendMethod,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
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
        if (courseID.value > 0) {
            alert(data.message);
            pageBack();
        }
        clean();
    })
    .catch((error) =>
    console.error("Error al registrar el curso", error)
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