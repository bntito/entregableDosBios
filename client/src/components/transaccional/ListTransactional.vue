<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div>
        <h2>Listado transaccional de curso</h2>
        <div v-if="ifList">
            <h3>Cargando...</h3>
        </div>
        <table v-if="!ifList">
            <tr class="tableTittle">
                <th width="10%">Código de curso</th>
                <th width="10%">DNI de estudiante</th>
                <th width="10%">DNI de profesor</th>
                <th width="5%">Fecha de inicio</th>
                <th width="5%">Fecha de culminación</th>
            </tr>
            <tbody>
                <DetailTransactional class="listDetail"
                    v-for="(item, index) in transactional"
                    :key="index"
                    :row="index"
                    :code="item.course"
                    :students="item.students"
                    :professors="item.professor"
                    :start="item.courseStart"
                    :end="item.courseEnd"
                />
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DetailTransactional from "../transaccional/DetailTransactional.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const url = "http://localhost:3000/api";

const transactional = ref([]);
const ifList = ref(false);

onMounted(async () => {
    ifList.value = true;
    let api = `${url}/transactional`;
    try {
        const response = await fetch(api);
        const data = await response.json();
   
        if("transactional" in data) {
            transactional.value = data.transactional.map(item => ({
                ...item,
                students: item.students.map(student => ({ dni: student.dni, id: student.id })),
                professors: item.professors ? item.professors.map(professor => ({ dni: professor.dni, id: professor.id })) : []
            }));
            ifList.value = false;
        } else {
            console.error("La propiedad transactional no está en la respuesta del servidor");
        }
    } catch (error) {
        console.error("Error al cargar tabla transaccional", error);
        ifList.value = false; 
    };
});

const pageBack = () => {
    router.back();
};

</script>

<style scoped>

table > tbody > tr {
    height: 50px;
    background-color: rgb(92, 92, 92);
}

table > tbody > tr:hover {
    background-color: rgb(126, 126, 126);
}

</style>