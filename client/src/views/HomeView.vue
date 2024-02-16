<template>
    <div class="background">
    <main>Página principal</main>
    <h2>Bienvenido a la Academia IoT</h2>
    </div>
</template>

<style scoped>
.background {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.background::before {
    content: "";
    position: absolute;
    top: 1;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/images/back.svg");
    background-size: cover;
    background-position: center;
    opacity: 0.5;
    z-index: -1;
}

main {
    color: rgb(32, 240, 255);
    text-decoration-line: underline;
    margin-top: 1rem;
    font-size: 1rem;
}

h2 {
    color: rgb(0, 183, 255);
    text-shadow: 2px 2px 5px rgb(17, 0, 255);
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 3rem;
    font-weight: 700;
    margin-top: 2.2rem;
}


</style>