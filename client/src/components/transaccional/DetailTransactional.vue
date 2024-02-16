<template>
    <tr v-if="showRow">
        <td v-if="code != ''" :class="classBgTr">{{ code }}</td>
        <td v-if="students != ''" :class="classBgTr">
            <template v-for="(student, index) in students" :key="index">
                <tr v-if="student.dni !== 'No asignado'">
                    <td>{{ index + 1 }}</td>
                    <span style="margin-right: 5px;"></span>
                    <td>
                        <router-link v-if="student.id !== null" :to="{ name: 'ProfileStudentEdit', params: { id: student.id, ed: 1 }}">{{ student.dni }}</router-link>
                        <span v-else>{{ student.dni }}</span>
                    </td>
                </tr>
                <tr v-else>{{ student.dni }}</tr>
            </template>
        </td>
        <td v-if="professors != ''" :class="classBgTr">
            <template v-for="(professor, index) in professors" :key="index">
                <tr v-if="professor.dni !== 'No asignado'">
                    <td>{{ index + 1 }}</td>
                    <span style="margin-right: 5px;"></span>
                    <td>
                        <router-link v-if="professor.id !== null" :to="{ name: 'ProfileProfessorEdit', params: { id: professor.id, ed: 1 }}">{{ professor.dni }}</router-link>
                        <span v-else>{{ professor.dni }}</span>
                    </td>
                </tr>
                <tr v-else>{{ professor.dni }}</tr>
            </template>
        </td>
        <td v-if="start != ''" :class="classBgTr">{{ start }}</td>
        <td v-if="end != ''" :class="classBgTr">{{ end }}</td>
    </tr>
</template>

<script setup>
import { computed } from 'vue';

const { row, code, students, dniP, start, end } = defineProps({
    row: Number,
    code: String,
    students: Array,
    professors: Array,
    start: String,
    end: String,
});

const showRow = students && students.length > 0;

const classBgTr = computed(() => {
    if(row % 2 === 0) {
        return "BgDark";
    }
    return "BgLight";
});

</script>