const fs = require("fs").promises;

const courseFile = "src/json/course.json";
const studentFile = "src/json/student.json";
const professorFile = "src/json/professor.json";

const getTransactional = async (req, res) => {
    try {
        const courseData = await fs.readFile(courseFile, "utf-8");
        const studentData = await fs.readFile(studentFile, "utf-8");
        const professorData = await fs.readFile(professorFile, "utf-8");

        const courses = JSON.parse(courseData);
        const students = JSON.parse(studentData);
        const professors = JSON.parse(professorData);

        const catalog = courses.map((course) => {
            const studentCourse = students.filter((student) => student.course === course.name);
            const professorCourse = professors.filter((professor) => professor.course === course.name);

            return {
                course: course.code,
                professor: professorCourse.length > 0 ? professorCourse.map((professor) => ({
                    dni: professor.dni,
                    id: professor.id,
                })) : [{ dni: "No asignado", id: null }],
                students: studentCourse.length > 0 ? studentCourse.map((student) => ({
                    dni: student.dni,
                    id: student.id,
                })) : [{ dni: "No asignado", id: null }],
                courseStart: course.start,
                courseEnd: course.end,
            };
        });
        setTimeout(() => {
            res.json({ transactional : catalog });
        }, 1000);
    } catch (error) {
        console.error("Error al procesar la solicitud transaccional", error);
        res.status(500).send("Error interno del servidor");
    }
};

module.exports = {
    getTransactional
};