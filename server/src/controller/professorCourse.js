const fs = require("fs").promises;

const professorFile = "src/json/professor.json";
const courseFile = "src/json/course.json";

const getProfessorCourse = async (req, res) => {
    try {
        const professorData = await fs.readFile(professorFile, "utf-8");
        const courseData = await fs.readFile(courseFile, "utf-8");

        const professor = JSON.parse(professorData);
        const course = JSON.parse(courseData);

        const professorCourse = professor.map((professor) => {
            const matchCourse = course.find((course) => course.name === professor.course);
            
            if (matchCourse) {
                return {
                    professor: {
                        idP: professor.id,
                        dni: professor.dni,
                        nameP: professor.name,
                        cost: professor.cost,
                    },
                    course: {
                        idC: matchCourse.id,
                        code: matchCourse.code,
                        nameC: matchCourse.name,
                    },
                };
            }
        });

        const filterProfessorCourse = professorCourse.filter((entry) => entry);

        setTimeout(() => { 
            return res.status(200).json({
                professorCourse: filterProfessorCourse,
                message: "Consulta exitosa",
                success: true,
            });
        }, 1000);
        } catch (error) {
        console.log("Error en la consulta", error);
        return res.status(500).json({ message: "Error en la consulta", success: false });
    }
};

module.exports = {
    getProfessorCourse
}