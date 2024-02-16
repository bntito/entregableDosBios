const fs = require("fs").promises;
const studentFile = "src/json/student.json";
const courseFile = "src/json/course.json";

const addStudent = async (req, res) => {
    let newStudent = {
        id: parseInt(req.body.id),
        course: req.body.course,
        codeCourse: req.body.codeCourse,
        dni: req.body.dni,
        name: req.body.name,
        lastname: req.body.lastname,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        tnc: req.body.tnc,
    };

    try {
        const dataStudents = await fs.readFile(studentFile, "utf-8");
        const dataCourses = await fs.readFile(courseFile, "utf-8");
        const students = JSON.parse(dataStudents);
        const courses = JSON.parse(dataCourses);
        
        let id = getNextId(students);
        newStudent.id = id;
        students.push(newStudent);

        const matchCourse = courses.find((course) => course.code == req.body.codeCourse);
        const codeCourseMatch = matchCourse.code;

        if (matchCourse) {
            if (!matchCourse.relationCS) {
                matchCourse.relationCS = [];
            }

            let courseRelation = matchCourse.relationCS.find(relation => relation.code === codeCourseMatch);

            if (!courseRelation) {
                courseRelation = { code: codeCourseMatch, dniStudent: [] };
                matchCourse.relationCS.push(courseRelation);
            }

            const dniExist = courseRelation.dniStudent.includes(req.body.dni);

            if (!dniExist) {
                courseRelation.dniStudent.push(req.body.dni);
                await fs.writeFile(courseFile, JSON.stringify(courses, null, 2));
                await fs.writeFile(studentFile, JSON.stringify(students, null, 2));
                return res.status(201).send({ message: "Registro de estudiante exitoso", success: true });
            } else {
                return res.status(400).send({ message: "El estudiante ya esta registrado en este curso", success: false });
            }
        }
    } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Error interno del servidor", success: false });
        }    
};

const getStudents = async (req, res) => {
    try {
        const data = await fs.readFile(studentFile, "utf-8");
        const students = JSON.parse(data);
        setTimeout(() => {
            res.send(students).status(200);
        }, 1000);
        return;
    } catch (error) {
        console.log("Error al buscar estudiante", error);
    }
};

const getStudent = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const data = await fs.readFile(studentFile, "utf-8");
        const students = JSON.parse(data);
        const student = students.find((student) => student.id === id);
        return res.status(200).json({ student, message: "Consulta exitosa", success: true });
    } catch (error) {
        console.log("Error en consulta", error);
    }
};

const getStudentDni = async (req, res) => {
    let dni = parseInt(req.params.dni);
    try {
        const data = await fs.readFile(studentFile, "utf-8");
        const students = JSON.parse(data);
        const student = students.find((student) => student.dni == dni);
        let messageResult = "";
        let status = false;
        if (student == undefined) {
            messageResult = "El DNI ingresado no existe";
            status = false;
        } else {
            messageResult = "Consulta exitosa";
            status = true;
        }
        return res.status(200).json({ student, message: messageResult, success: status });
    } catch (error) {
        console.log("Error en consulta", error);
    }
};

const updateStudent = async (req, res) => {
    let id = parseInt(req.params.id);
    let newData = {
        id: parseInt(req.body.id),
        course: req.body.course,
        dni: req.body.dni,
        name: req.body.name,
        lastname: req.body.lastname,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        tnc: req.body.tnc,
    };
    try {
        const data = await fs.readFile(studentFile, "utf-8");
        const students = JSON.parse(data);
        const index = students.findIndex((item) => item.id === id);
        if (index >= 0) {
            students[index] = newData;
            await fs.writeFile(studentFile, JSON.stringify(students, null, 2));
        }
        return res.status(200).json({ message: "Registro actualizado", success: true });
    } catch (error) {
        console.log(error);
    }
};

const deleteStudent = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const dataProfessors = await fs.readFile(studentFile, "utf-8");
        const dataCourses = await fs.readFile(courseFile, "utf-8");
        const students = JSON.parse(dataProfessors);
        const courses = JSON.parse(dataCourses);

        const index = students.findIndex((item) => item.id === id);

        if (index !== -1) {
            const dniStudentFound = students[index].dni;
            students.splice(index, 1);
            await fs.writeFile(studentFile, JSON.stringify(students, null, 2));

            courses.forEach(course => {
                if (course.relationCS && Array.isArray(course.relationCS) && course.relationCS.length > 0) {
                    let dniStudent = course.relationCS[0].dniStudent;
                    if (dniStudent && Array.isArray(dniStudent) && dniStudent.length > 0) {
                        course.relationCS[0].dniStudent = dniStudent.filter(dni => dni !== dniStudentFound);
                    }
                }
            });

            await fs.writeFile(courseFile, JSON.stringify(courses, null, 2));
            res.status(200).json({ message: "El estudiante y su DNI han sido eliminados correctamene", success: true });
        } else {
            res.status(404).json({ error: "No se enconró ningín estudiante con el ID", success: false });
        }
    } catch (error) {
        console.error("Error al eliminar el estudiante y su DNI", error);
        res.status(500).json({ error: "Error interno del servidor", success: false });
    }
};

function getNextId(data) {
    if (data.length === 0) {
        return 1;
    }
    const maxId = Math.max(...data.map((item) => item.id));
    return maxId + 1;
};

module.exports = {
    addStudent,
    getStudents,
    getStudent,
    getStudentDni,
    updateStudent,
    deleteStudent
};