const express = require("express");
const router = express.Router();

const {
    addProfessor,
    getProfessors,
    getProfessor,
    getProfessorDni,
    updateProfessor,
    deleteProfessor
} = require("../controller/professor");

router.post("/professor", addProfessor);
router.get("/professor", getProfessors);
router.get("/professor/:id", getProfessor);
router.get("/professordni/:dni", getProfessorDni);
router.put("/professor/:id", updateProfessor);
router.delete("/professor/:id", deleteProfessor);

module.exports = router;