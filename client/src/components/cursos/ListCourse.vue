<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div>
        <div class="listTittle">
            <h2>Listado de cursos</h2>
        </div>
        <div v-if="ifCourse">
            <h3>Cargando...</h3>
        </div>
        <table v-if="!ifCourse">
            <tr class="tableTittle">
                <th width="5%">Código</th>
                <th width="15%">Nombre</th>
                <th width="35%">Descripción</th>
                <th width="10%">Costo</th>
                <th width="15%">Estado del curso</th>
                <th width="10%">Fecha de inicio</th>
                <th width="10%">Fecha de culminación</th>
            </tr>
            <tbody>
                <tr v-for="(course, index) in courses" :key="course.id" class="listDetail">
                    <DetailCourse
                        :row="index"
                        :id="course.id"
                        :code="course.code"
                        :name="course.name"
                        :description="course.description"
                        :cost="course.cost"
                        :active="course.active"
                        :start="course.start"
                        :end="course.end"
                    />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DetailCourse from "@/components/cursos/DetailCourse.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const url = "http://localhost:3000/api";

const courses = ref([]);
const ifCourse = ref(false);

onMounted(async () => {
    ifCourse.value = true;
    let sendMethod = "GET";
    let api = `${url}/course`;
    await fetch(api)
    .then((response) => response.json())
    .then((data) => {
        courses.value = data;
        ifCourse.value = false;
    })
    .catch((error) =>
    console.error("Error al cargar la tabla de cursos", error)
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