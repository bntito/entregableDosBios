const express = require("express");
const router = express.Router();

const {
    addStudent,
    getStudents,
    getStudent,
    getStudentDni,
    updateStudent,
    deleteStudent
} = require("../controller/student");

router.post("/student", addStudent);
router.get("/student", getStudents);
router.get("/student/:id", getStudent);
router.get("/studentdni/:dni", getStudentDni);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

module.exports = router;