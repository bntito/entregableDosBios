const express = require("express");
const router = express.Router();

const {
    getProfessorCourse
} = require("../controller/professorCourse");

router.get("/professorcourse", getProfessorCourse);

module.exports = router;