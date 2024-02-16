<template>
    <td v-if="data.code != ''" :class="classBgTr">{{ data.code }}</td>
    <td v-if="data.name != ''" :class="classBgTr">{{ data.name }}</td>
    <td v-if="data.description != ''" :class="classBgTr">{{ data.description }}</td>
    <td v-if="data.cost != ''" :class="classBgTr">{{ data.cost }}</td>
    <td v-if="typeof data.active === 'boolean'" :class="classBgTr">{{ data.active ? 'Activo' : 'Inactivo' }}</td>
    <td v-if="data.start != ''" :class="classBgTr">{{ data.start }}</td>
    <td v-if="data.end != ''" :class="classBgTr">{{ data.end }}</td>
    
    <td class="action" :class="classBgTr"><router-link :to="{ name: 'ProfileCourseEdit', params: { id: data.id, ed: 1 }}">
        <button class="btnAction">
            <font-awesome-icon icon="eye"/>
        </button></router-link>
    </td>
    <td class="action" :class="classBgTr"><router-link :to="{ name: 'ProfileCourseUpdate', params: { id: data.id, ed: 0 }}">
        <button class="btnAction">
            <font-awesome-icon icon="highlighter"/>
        </button></router-link>
    </td>
    <td class="action" :class="classBgTr"><router-link :to="{ name: 'ProfileCourseDelete', params: { id: data.id }}">
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
    code: String,
    name: String,
    description: String,
    cost: Number,
    active: Boolean,
    start: String,
    end: String,
});

const classBgTr = computed(() => {
    if(data.row % 2 === 0) {
        return "BgDark";
    }
    return "BgLight";
});

</script>