<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div>
        <h2>Listado profesores por curso</h2>
        <div v-if="ifList">
            <h3>Cargando...</h3>
        </div>
        <table v-if="!ifList">
            <tr class="tableTittle">
                <th width="15%">Código de curso</th>
                <th width="15%">Nombre del curso</th>
                <th width="15%">DNI de profesor</th>
                <th width="20%">Nombre de profesor</th>
                <th width="5%">Costo del servicio por hora</th>
            </tr>
            <tbody>
                <tr v-for="(item, index) in professorCourse" :key="index" class="listDetail">
                    <DetailProfessorCourse
                        :row="index"
                        :code="item.course.code"
                        :nameC="item.course.nameC"
                        :dni="item.professor.dni"
                        :nameP="item.professor.nameP"
                        :cost="item.professor.cost"
                    />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DetailProfessorCourse from "../relaciones/DetailProfessorCourse.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const url = "http://localhost:3000/api";

const professorCourse = ref([]);
const ifList = ref(false);

onMounted(async () => {
    ifList.value = true;
    let api = `${url}/professorcourse`;
    await fetch(api)
    .then((response) => response.json())
    .then((data) => {
        professorCourse.value = data.professorCourse;
        ifList.value = false;
    })
    .catch((error) => 
    console.error("Error al cargar tabla de relación de profesores por curso", error)
    );
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