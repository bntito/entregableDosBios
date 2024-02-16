<script setup>
import { RouterView } from "vue-router";
import MenuBar from "./components/menu/MenuBar.vue";

</script>

<template>
    <header>
        <div class="wrapper">
            <div class="logo">Instituto IoT</div>
            <MenuBar
            />
        </div>
    </header>
    <RouterView
    />
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

body {
    background-color: rgb(39, 39, 39);
    color: white;
}

header {
    margin: 0;
    padding: 0;
    border: 0px;
    color: white;
    font-size: 1rem;
}

header .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
}

.logo {
    font-size: 1.5rem;
    margin-left: 1.8rem;
    margin-right: .5rem;
}

h2 {
    text-align: center;
    font-weight: 300;
    font-size: 2em;
    padding: .8em;
}

h3 {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 2%;
    font-size: 1.5em;
    font-weight: 100;
    color: rgb(8, 226, 255);
}

.delFrame {
    display: flex;
    justify-content: center;
    margin: .8rem;
    margin-bottom: 2rem;
    color: red;
    font-size: 1.4rem;
}

textarea,
select,
input {
    width: 100%;
    border-radius: 5px;
    border: 2px solid gray;
}

textarea:focus,
select:focus,
input:focus {
    border: 3px solid rgb(84, 138, 255);
    outline: 0 none;
}

textarea:disabled,
select:disabled,
input:disabled {
    background-color: rgb(156, 156, 156);
    color: rgb(241, 220, 220);
    border-color: black;
}

label {
    width: 100%;
}

.checkbox {
    text-align: center;
}

button {
    background-color: black;
    color: white;
    border: 0.5px solid rgb(179, 178, 178);
    border-radius: 8px;
    cursor: pointer;
}

button:hover {
    color: rgb(32, 240, 255);
    border: 0 solid rgb(73, 73, 73);
}

.btnBack {
    padding: .8rem 1.4rem;
    margin-left: 1em;
    margin-top: 1em;
}

.btnAction {
    padding: .8rem;
}

.formInput {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1em;
    margin-top: 5px;
}

.formTittle {
    text-align: center;
    background-color: rgb(114, 114, 114);
}

.listTittle {
    color: rgb(215, 254, 255);
    background-color: rgb(114, 114, 114);
}

.BgDark {
    background-color: rgb(132, 144, 146);
}

.BgLight {
    background-color: rgb(154, 178, 182);
}

@media (min-width: 990px) {
    .form {
        margin: 2em 10em 2em 10em;
        padding: .5em 2em 1em 2em;
        border: 2px solid black;
        border-radius: 8px;
    }
    
    .formTittle {
        margin: 1rem;
        padding: .6rem;
        border-radius: 10px 10px 0 0;
        font-size: 1.8rem;
        font-weight: 100;
    }

    .listTittle {
        margin: 2rem;
        padding: 2px;
        border-radius: 10px 10px 0 0;
        font-size: .8rem;
        font-weight: 100;
    }

    .tableTittle {
        font-size: 12px;
    }

    .listDetail {
        font-size: 14px;
    }

    label {
        font-weight: 200;
        font-size: 1em;
    }

    textarea,
    select,
    input {
        margin-top: 0.3em;
        margin-bottom: 0.6em;
        padding: 0.5em;
        font-size: 1em;
    }

    button {
        font-weight: 600;
        padding: .8em 4rem;
    }
}

@media (max-width: 990px) {
    .form {
        margin: 1em 3em 1em 3em;
        padding: .5em 1em 1em 1em;
        border: 2px solid black;
        border-radius: 8px;
    }

    .formTittle {
        margin: .8rem;
        padding: .4rem;
        border-radius: 10px 10px 0 0;
        font-size: 1rem;
        font-weight: 100;
    }

    .listTittle {
        margin: 1.5rem;
        padding: .1rem;
        border-radius: 10px 10px 0 0;
        font-size: .6rem;
        font-weight: 100;
    }

    .tableTittle {
        font-size: 10px;
    }

    .listDetail {
        font-size: 12px;
    }

    label {
        font-weight: 100;
        font-size: .6em;
    }

    textarea,
    select,
    input {
        margin-top: 0.2em;
        margin-bottom: 0.4em;
        padding: 0.3em;
        font-size: .7em;
    }

    .logo {
        font-size: 1rem;
    }

    button {
        font-size: .6em;
        font-weight: 200;
        padding: .4rem 1.2rem;
    }
}

</style>