<template>
    <div class="return">
        <button class="btnCollaps" @click="collaps">
            <font-awesome-icon icon="minimize"/>
        </button>
    </div>
    <div class="form">
        <h2 class="formTittle">Comentario del contacto</h2>
        <div class="formGroup">
            <div>
                <label for="contactEmail">Correo electrónico</label>
                <textarea v-model="contact.email"></textarea>
            </div>
            <div>
                <label for="contactName">Nombre</label>
                <textarea v-model="contact.name"></textarea>
            </div>
            <div>
                <label for="contactPhone">Teléfono</label>
                <textarea v-model="contact.phone"></textarea>
            </div>
        </div>
        <div class="">
            <div>
                <label for="contactComment">Comentario</label>
                <textarea rows="4" v-model="contact.comment"></textarea>
            </div>
        </div>
        <Message v-if="showMsg" 
            :message="message" 
            :status="processStatus"
            @blockShow="showStatus"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Message from "../servicios/Message.vue";
import { useRouter } from "vue-router";

const router = useRouter();

let showMsg = ref(false);

const props = defineProps({
    email: String,
    name: String,
    phone: String,
    comment: String
});

const showStatus = (val) => {
    showMsg.value = val;
};

const contact = {
    email: props.email || '',
    name: props.name || '',
    phone: props.phone || '',
    comment: props.comment || ''
};

const emits = defineEmits(["close"]);

const collaps = () => {
    emits("close");
}

</script>

<style scoped>
.form {
    margin: .5em 1em .5em 1em;
    padding: .5em 1em 1em 1em;
}

.formGroup {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1em;
    margin-top: 5px;
}

.btnCollaps {
    margin-left: 1em;
    margin-top: 1em;
}

</style>