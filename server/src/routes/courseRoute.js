const express = require("express");
const router = express.Router();

const {
    addCourse,
    getCourses,
    getCourse,
    getCourseName,
    updateCourse,
    deleteCourse
} = require("../controller/course");

router.post("/course", addCourse);
router.get("/course", getCourses);
router.get("/course/:id", getCourse);
router.get("/coursename/:name", getCourseName);
router.put("/course/:id", updateCourse)
router.delete("/course/:id", deleteCourse);

module.exports = router;