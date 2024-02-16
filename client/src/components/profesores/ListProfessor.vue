<template>
    <div class="return">
        <button class="btnBack" @click="pageBack">
            <font-awesome-icon icon="arrow-rotate-left"/>
        </button>
    </div>
    <div>
        <div class="listTittle">
            <h2>Listado de profesores</h2>
        </div>
        <div v-if="ifProfessor">
            <h3>Cargando...</h3>
        </div>
        <table v-if="!ifProfessor">
            <tr class="tableTittle">
                <th width="8%">Perfil del profesor</th>
                <th width="5%">Costo de servicio por hora</th>
                <th width="10%">Número de documento</th>
                <th width="10%">Nombre/s</th>
                <th width="10%">Apellidos</th>
                <th width="8%">País de residencia</th>
                <th width="14%">Dirección</th>
                <th width="10%">Teléfono</th>
                <th width="20%">Correo electrónico</th>
                <th width="5%">Estado de profesor</th>
            </tr>
            <tbody>
                <tr v-for="(professor, index) in professors" :key="professor.id" class="listDetail">
                    <DetailProfessor
                        :row="index"
                        :id="professor.id"
                        :course="professor.course"
                        :cost="professor.cost"
                        :dni="professor.dni"
                        :name="professor.name"
                        :lastname="professor.lastname"
                        :country="professor.country"
                        :address="professor.address"
                        :phone="professor.phone"
                        :email="professor.email"
                        :active="professor.active"
                    />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DetailProfessor from "@/components/profesores/DetailProfessor.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const url = "http://localhost:3000/api";

const professors = ref([]);
const ifProfessor = ref(false);

onMounted(async () => {
    ifProfessor.value = true;
    let api = `${url}/professor`;
    await fetch(api)
    .then((response) => response.json())
    .then((data) => {
        professors.value = data;
        ifProfessor.value = false;
    })
    .catch((error) =>
    console.error("Error al cargar la tabla de profesores", error)
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