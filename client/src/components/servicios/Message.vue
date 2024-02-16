<template>
    <div v-if="isVisible" class="message" :class="classStatus">
        <h4>{{ message }}</h4>
    </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { ref, onMounted } from "vue";
const isVisible = ref(true);

const props = defineProps({
    message: String,
    status: String,
    duration: {
        type: Number,
        default: 2000,
    },
});

const emit = defineEmits(["blockShow"]);

const classStatus = computed(() => {
    if (props.status === "success") {
        return "successClass";
    }
    if (props.status === "warning") {
        return "warningClass";
    }
    if (props.status === "fail") {
        return "failClass";
    }
});

onMounted(() => {
    setTimeout(() => {
        isVisible.value = false;
        emit("blockShow", false);
    }, props.duration);
});

</script>

<style scoped>
.message {
    display: flex;
    justify-content: center;
    font-size: 1.1rem;
    margin-top: .8rem;
    margin-bottom: 1rem;
}

.successClass {
    padding: 10px;
    background-color: black;
    color: green;
    border: 3px solid rgb(67, 104, 70);
}

.warningClass {
    padding: 10px;
    background-color: black;
    color: orange;
    border: 3px solid rgb(114, 95, 61);
}
.failClass {
    padding: 10px;
    background-color: black;
    color: red;
    border: 3px solid rgb(133, 87, 87);
}
</style>