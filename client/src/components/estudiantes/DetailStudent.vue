<template>
    <td v-if="data.course != ''" :class="classBgTr">{{ data.course }}</td>
    <td v-if="data.dni != ''" :class="classBgTr">{{ data.dni }}</td>
    <td v-if="data.name != ''" :class="classBgTr">{{ data.name }}</td>
    <td v-if="data.lastname != ''" :class="classBgTr">{{ data.lastname }}</td>
    <td v-if="data.address != ''" :class="classBgTr">{{ data.address }}</td>
    <td v-if="data.phone != ''" :class="classBgTr">{{ data.phone }}</td>
    <td v-if="data.email != ''" :class="classBgTr">{{ data.email }}</td>

    <td class="action" :class="classBgTr"><router-link :to="{ name: 'ProfileStudentEdit', params: { id: data.id, ed: 1 }}">
        <button class="btnAction">
            <font-awesome-icon icon="eye"/>
        </button></router-link>
    </td>
    <td class="action" :class="classBgTr"><router-link :to="{ name: 'ProfileStudentUpdate', params: { id: data.id, ed: 0 }}">
        <button class="btnAction">
            <font-awesome-icon icon="highlighter"/>
        </button></router-link>
    </td>
    <td class="action" :class="classBgTr"><router-link :to="{ name: 'ProfileStudentDelete', params: { id: data.id }}">
        <button class="btnAction">
            <font-awesome-icon icon="trash-can"/>
        </button></router-link>
    </td>
</template>

<script setup>
import { computed } from "vue";

const data = defineProps({
    row: Number,
    id: Number,
    course: String,
    dni: String,
    name: String,
    lastname: String,
    address: String,
    phone: String,
    email: String
});

const classBgTr = computed(() => {
    if(data.row % 2 === 0) {
        return "BgDark";
    }
    return "BgLight";
});

</script>