<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div class="form">
        <h2 class="formTittle">
            Eliminar información del estudiante
        </h2>
        <div class="delFrame">
            <h3>Confirmar eliminación del estudiante</h3>
        </div>
        <Message v-if="showMsg" 
            :message="message" 
            :status="processStatus" 
            @blockShow="showStatus"
        />
        <div class="buttons">
            <button type="button" @click="deleteStudent(studentID.value)">Eliminar</button>
            <button type="button" @click="pageBack()">Cancelar</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Message from "../servicios/Message.vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();
const url = "http://localhost:3000/api";

const route = useRoute();
let message = ref("");
let studentID = ref(route.params.id);
let showMsg = ref(false);
let processStatus = ref("");

const deleteStudent = async (id) => {
    let api = `${url}/student/${studentID.value}`;
    fetch(api, {
        method: "DELETE",
    })
    .then(() => {
        message.value = "Registro eliminado con éxito";
        processStatus.value = "success";
        showStatus(true);
        setTimeout(() => {
            router.back();
        }, 2000);
    })
    .catch((error) => {
        console.error("Error al eliminar información del estudiante", error);
        processStatus.value = "fail";
        showStatus(true);
    })
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
}
</style>