<template>
    <div class="menuContainer" :class="{ collapsed: isCollapsed }">
        <button class="iconMenu" @click="toggleCollapse"><font-awesome-icon :icon="['fas', 'bars']" spin class="icons"/></button>
        <ul class="menu">
            <li v-for="(item, index) in menuItems" :key="index" @click.prevent="menuClick(item)">
                <font-awesome-icon v-if="item.icon" :icon="item.icon"/>
                {{ item.name }}
                <ul v-if="item.children && item.children.length" class="subMenu">
                    <li v-for="(childItem, childIndex) in item.children" :key="childIndex" @click.prevent="childItem.onClick(childItem)">
                        <font-awesome-icon v-if="childItem.icon" :icon="childItem.icon"/>
                        {{ childItem.name }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isCollapsed = ref(true);

const profileStatus = ref("");

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value;
};

const menuClick = (item) => {
    if (item.name === "Salir") {
        window.location.href = "https://www.google.com";
    } else {
        if (item.params) {
            router.push({ name: item.route, params: item.params });
        } else {
            if (profileStatus.value === item.route) {
                if (item.route === 'ProfileCourseEdit') {
                    router.push({ name: 'ProfileCourseEdit', params: { id: 0, ed: 0 } });
                } else if (item.route === 'ProfileStudentEdit') {
                router.push({ name: 'ProfileStudentEdit', params: { id: 0, ed: 0 } });
            } else if (item.route === 'ProfileProfessorEdit') {
                router.push({ name: 'ProfileProfessorEdit', params: { id: 0, ed: 0 } });
            } else {
                router.push({ name: item.route });
            }
        } else {
            router.push({ name: item.route });
            }
        }
    }
    isCollapsed.value = false;
    toggleCollapse();
};

const menuItems = [
    {
        name: "Inicio",
        icon: "home",
        route: "Home",
        onClick(item) {
            menuClick(item);
        },
    },
    {
        name: "Cursos",
        icon: "landmark",
        onClick(item) {},
        children: [
            {
                name: "Registro de cursos",
                icon: "code",
                route: "RegisterCourse",
                onClick(item) {
                    menuClick(item);
                },  
            },
            {
                name: "Listado de cursos",
                icon: "list",
                route: "ListCourses",
                onClick(item) {
                    menuClick(item);
                },
            },
            {
                name: "Perfil",
                icon: "user-secret",
                route: "ProfileCourseEdit",
                onClick(item) {
                    profileStatus.value = "ProfileCourseEdit";
                    menuClick(item);
                },
            },
        ],
    },
    {
        name: "Estudiantes",
        icon: "flask",
        onClick(item) {},
        children: [
            {
                name: "Registro de estudiantes",
                icon: "hand",
                route: "RegisterStudent",
                onClick(item) {
                    menuClick(item);
                },
            },
            {
                name: "Listado de estudiantes",
                icon: "list",
                route: "ListStudent",
                onClick(item) {
                    menuClick(item);
                },
            },
            {
                name: "Perfil",
                icon: "user-secret",
                route: "ProfileStudentEdit",
                onClick(item) {
                    profileStatus.value = "ProfileStudentEdit";
                    menuClick(item);
                },
            },
        ],
    },
    {
        name: "Profesores",
        icon: "compass",
        onClick(item) {},
        children: [
            {
                name: "Registro de profesor",
                icon: "stethoscope",
                route: "RegisterProfessor",
                onClick(item) {
                    menuClick(item);
                },
            },
            {
                name: "Listado de profesores",
                icon: "list",
                route: "ListProfessors",
                onClick(item) {
                    menuClick(item);
                },
            },
            {
                name: "Perfil",
                icon: "user-secret",
                route: "ProfileProfessorEdit",
                onClick(item) {
                    profileStatus.value = "ProfileProfessorEdit";
                    menuClick(item);
                },
            },
        ],
    },
    {
        name: "Contacto",
        icon: "paper-plane",
        route: "Contact",
        onClick(item) {
            menuClick(item);
        },
    },
    {
        name: "Adminitración",
        icon: "network-wired",
        onClick(item) {},
        children: [
            {
                name: "Cursos",
                icon: "code",
                route: "ListCourses",
                onClick(item) {
                    menuClick(item);
                },
            },
            {
                name: "Estudiantes",
                icon: "flask",
                route: "ListStudent",
                onClick(item) {
                    menuClick(item);
                },
            },
            {
                name: "Profesores",
                icon: "compass",
                route: "ListProfessors",
                onClick(item) {
                    menuClick(item);
                },
            },
            {
                name: "Profesores por curso",
                icon: "link",
                route: "ListProfessorCourse",
                onClick(item) {
                    menuClick(item);
                },
            },
            {
                name: "Transaccional",
                icon: "users",
                route: "ListTransactional",
                onClick(item) {
                    menuClick(item);
                },
            },
            {
                name: "Comentarios",
                icon: "quote-right",
                route: "ListContact",
                onClick(item) {
                    menuClick(item);
                },
            },
        ],
    },
    {
        name: "Salir",
        icon: "truck",
    },
];

</script>


<style scoped>
.icons {
    color: rgb(32, 240, 255);
    font-size: 1rem;
}
.menuContainer {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 1.1rem;
    font-weight: 300;
    background-color: rgb(0, 0, 0);
    color: white;
    padding: 1.5rem;
    height: 2.8rem;
    display: flex;
    white-space: nowrap;
    justify-content: space-around;
    align-items: center;
    outline: 0;
    border: 0;
}
.menu > li {
    position: relative;
    cursor: pointer;
    margin: 10px;
    padding: 5px;
}

.menu > li:hover {
    padding: .35rem;
    background-color: rgb(65, 70, 85);
    color: rgb(32, 240, 255);
    border: 0.5px solid rgb(98, 110, 146);
    box-shadow: 6px 1px 6px rgba(8, 120, 185, 0.918);
    border-radius: 10px;
}

.menu > li > ul > li {
    list-style: none;
    margin: .4rem;
    color: white;
}

.menu > li > ul > li:hover {
    color: rgb(32, 240, 255);
    border: 1px solid rgb(12, 50, 71);
    padding: 3px;
    box-shadow: 0px 5px 6px rgba(8, 120, 185, 0.918);
    border-radius: 5px;
    cursor: pointer;
}

.menu > li:hover .subMenu {
    display: block;
    padding: .5rem;
}

.subMenu {
    display: none;
    position: absolute;
    background-color: #000000;
    border: 1px solid #cccccc;
    box-shadow: 0px 5px 6px rgba(8, 120, 185, 0.918);
    top: 2.2rem;
    padding: .5rem;
    border-radius: 8px;
}

.menu {
    list-style: none;
    padding: 3px 0;
    display: flex;
    flex-direction: row;
}

.iconMenu {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    display: flex;
    width: 20px;
    cursor: pointer;
    z-index: 1000;
}

@media (min-width: 990px) {
    .iconMenu {
        display: none;
    }
    
    .menuContainer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-right: 45%;
        outline: 0;
        border: 0;
    }
    .menu {
        display: flex;
        flex-direction: row;
    }

    .collapsed .menu > ul {
        display: none;
    }
}

@media (max-width: 990px) {
    .iconMenu {
        right: 1.5rem;
        top: auto;
        border: none;
    }

    .wrapper {
        display: flex;
        justify-content: flex-end;
    }
    .menuContainer {
        padding: 2px 0;
        transition: 0.3s ease-in-out;
    }
    .menu {
        display: flex;
        flex-direction: column;
        position: fixed;
        background-color: rgba(128, 128, 128, 0.76);
        border-radius: 8px;
        top: 4rem;
        left: 1rem;
        bottom: auto;
        width: 200px;
        z-index: 1000;
        font-size: 1rem;
    }

    .menu > li {
        font-size: .8rem;
        padding: 4px 15px;
    }

    .menu > li > ul {
        font-size: .8rem;
        display: none;
        position: relative;
        list-style: none;
        top: .6rem;
        left: 1.2rem;
        width: 250px;
        background-color: gray;
        border: 1px solid rgb(78, 115, 126);
    }

    .menu > li > ul > li {
        margin: 2px 0;
        padding: 3px 10px;
    }

    .menu > li > ul > li:hover {
        background-color: rgb(80, 86, 105);
        border-radius: 5px;
    }

    .collapsed .menu {
        display: none;
    }
}

</style>