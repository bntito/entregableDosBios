import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/HomeView.vue";

import AddCourseView from "../views/AddCourseView.vue";
import ListCourseView from "../views/ListCourseView.vue";
import DelCourseView from "../views/DelCourseView.vue";
import ProfileCourseView from "../views/ProfileCourseView.vue";

import AddStudentView from "../views/AddStudentView.vue";
import ListStudentView from "../views/ListStudentView.vue";
import DelStudentView from "../views/DelStudentView.vue";
import ProfileStudentView from "../views/ProfileStudentView.vue";

import AddProfessorView from "../views/AddProfessorView.vue";
import ListProfessorView from "../views/ListProfessorView.vue";
import DelProfessorView from "../views/DelProfessorView.vue";
import ProfileProfessorView from "../views/ProfileProfessorView.vue";

import ContactView from "../views/ContactView.vue";
import ListContactView from "../views/ListContactView.vue";
import SeeContactView from "../views/SeeContactView.vue";

import ListProfessorCourseView from "../views/ListProfessorCourseView.vue";

import ListTransactionalView from "../views/ListTransactionalView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/registercourse",
      name: "RegisterCourse",
      component: AddCourseView,
    },
    {
      path: "/listcourse",
      name: "ListCourses",
      component: ListCourseView,
    },
    {
      path: "/profilecoursedelete/:id",
      name: "ProfileCourseDelete",
      component: DelCourseView,
    },
    {
      path: "/profilecourseedit/:id/:ed",
      name: "ProfileCourseEdit",
      component: ProfileCourseView,
    },
    {
      path: "/profilecourseupdate/:id/:ed",
      name: "ProfileCourseUpdate",
      component: ProfileCourseView,
    },
    {
      path: "/registerstudent",
      name: "RegisterStudent",
      component: AddStudentView,
    },
    {
      path: "/liststudent",
      name: "ListStudent",
      component: ListStudentView,
    },
    {
      path: "/profilestudentdelete/:id",
      name: "ProfileStudentDelete",
      component: DelStudentView,
    },
    {
      path: "/profilestudentedit/:id/:ed",
      name: "ProfileStudentEdit",
      component: ProfileStudentView,
    },
    {
      path: "/profilestudentupdate/:id/:ed",
      name: "ProfileStudentUpdate",
      component: ProfileStudentView,
    },
    {
      path: "/registerprofessor",
      name: "RegisterProfessor",
      component: AddProfessorView,
    },
    {
      path: "/listprofessor",
      name: "ListProfessors",
      component: ListProfessorView,
    },
    {
      path: "/profileprofessordelete/:id",
      name: "ProfileProfessorDelete",
      component: DelProfessorView,
    },
    {
      path: "/profileprofessoredit/:id/:ed",
      name: "ProfileProfessorEdit",
      component: ProfileProfessorView,
    },
    {
      path: "/profileprofessorupdate/:id/:ed",
      name: "ProfileProfessorUpdate",
      component: ProfileProfessorView,
    },
    {
      path: "/contact",
      name: "Contact",
      component: ContactView,
    },
    {
      path: "/listcontact",
      name: "ListContact",
      component: ListContactView,
    },
    {
      path: "/seecontact",
      name: "SeeContact",
      component: SeeContactView,
    },
    {
      path: "/listprofessorcourse",
      name: "ListProfessorCourse",
      component: ListProfessorCourseView,
    },
    {
      path: "/transactional",
      name: "ListTransactional",
      component: ListTransactionalView,
    },
  ],
});

export default router
