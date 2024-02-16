<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div>
        <div class="listTittle">
            <h2>Listado de estudiantes</h2>
        </div>
        <div v-if="ifStudent">
            <h3>Cargando...</h3>
        </div>
        <table v-if="!ifStudent">
            <tr class="tableTittle">
                <th width="10%">Curso</th>
                <th width="10%">Número de documento</th>
                <th width="15%">Nombre/s</th>
                <th width="15%">Apellidos</th>
                <th width="20%">Dirección</th>
                <th width="10%">Teléfono</th>
                <th width="20%">Correo electrónico</th>
            </tr>
            <tbody>
                <tr v-for="(student, index) in students" :key="student.id" class="listDetail">
                    <DetailStudent
                        :row="index"
                        :id="student.id"
                        :course="student.course"
                        :dni="student.dni"
                        :name="student.name"
                        :lastname="student.lastname"
                        :address="student.address"
                        :phone="student.phone"
                        :email="student.email"
                    />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DetailStudent from '@/components/estudiantes/DetailStudent.vue';
import { useRouter } from "vue-router";




const router = useRouter();
const url = "http://localhost:3000/api";

const students = ref ([]);
const ifStudent = ref(false);

onMounted(async () => {
    ifStudent.value = true;
    let api = `${url}/student`;
    await fetch(api)
    .then((response) => response.json())
    .then((data) => {
        students.value = data;
        ifStudent.value = false;
    })
    .catch((error) =>
    console.error("Error al cargar la tabla de estudiantes", error)
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