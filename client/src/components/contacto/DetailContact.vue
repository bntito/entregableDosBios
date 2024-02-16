<template>
        <td v-if="showList" :class="classBgTr">{{ contact.email }}</td>
        <td v-if="showList" :class="classBgTr">{{ contact.name }}</td>
        <td v-if="showList" :class="classBgTr">{{ contact.phone }}</td>
        <td v-if="showList" :class="classBgTr">{{ contact.comment }}</td>
        <td v-if="showList" :class="classBgTr"><a @click="seeComment({...contact})">
            <button class="btnAction">
                <font-awesome-icon icon="eye"/>   
            </button></a>
        </td>
        <td v-if="showList" :class="classBgTr"><a @click="deleteComment(contact.id)">
            <button class="btnAction">
                <font-awesome-icon icon="trash-can"/>
            </button></a>
        </td>
        <td colspan="6" v-if="showComment">
            <div class="seeComment">
                <SeeComment
                    :email="selectedComment.email"
                    :name="selectedComment.name"
                    :phone="selectedComment.phone"
                    :comment="selectedComment.comment"
                    @close="closeComment"
                />
            </div>
        </td>
</template>

<script setup>
import { ref, computed } from 'vue';
import SeeComment from "../contacto/SeeComment.vue"

const contact = defineProps({
    row: Number,
    id: Number,
    email: String,
    name: String,
    phone: String,
    comment: String
});

const emitsContact = defineEmits(["seeCommentEmit", "deleteCommentEmit"]);

const classBgTr = computed(() => {
    if (contact.row % 2 === 0) {
        return "BgDark";
    }
    return "BgLight";
});

const showList = ref(true);
const showComment = ref(false);

let selectedComment = ref({});

const seeComment = (data) => {
    selectedComment.value = data;
    showList.value = false;
    showComment.value = true;
};

const deleteComment = (id) => {
    emitsContact("deleteCommentEmit", id);
};

const closeComment = () => {
    showComment.value = false;
    showList.value = true;
}

</script>