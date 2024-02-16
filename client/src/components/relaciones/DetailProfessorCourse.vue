<template>
    <td v-if="data.code != ''" :class="classBgTr">{{ data.code }}</td>
    <td v-if="data.nameC != ''" :class="classBgTr">{{ data.nameC }}</td>
    <td v-if="data.dni != ''" :class="classBgTr">{{ data.dni }}</td>
    <td v-if="data.nameP != ''" :class="classBgTr">{{ data.nameP }}</td>
    <td v-if="data.cost != ''" :class="classBgTr">{{ data.cost }}</td>
</template>

<script setup>
import { computed } from 'vue';

const data = defineProps({
    row: Number,
    code: String,
    nameC: String,
    dni: String,
    nameP: String,
    cost: Number,
});

const classBgTr = computed(() => {
    if(data.row % 2 === 0) {
        return "BgDark";
    }
    return "BgLight";
});

</script>