const fs = require("fs").promises;
const coursesFile = "src/json/course.json";

const addCourse = async (req, res) => {
    let newCourse = {
        id: parseInt(req.body.id),
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        active: req.body.active,
        start: req.body.start,
        end: req.body.end,
    };
    try {
        const data = await fs.readFile(coursesFile, "utf-8");
        const courses = JSON.parse(data);
        const course = courses.find((course) => course.name == req.body.name);
        if (course) {
            return res.status(400).send({ message: "Nombre de curso ya registrado", success: false });
        }
        let id = getNextId(courses);
        newCourse.id = id;
        courses.push(newCourse);
        await fs.writeFile(coursesFile, JSON.stringify(courses, null, 2));
        return res.status(201).send({ message: "Registro de curso exitoso", success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error interno del servidor", success: false});
    }
};

const getCourses = async (req, res) => {
    try {
        const data = await fs.readFile(coursesFile, "utf-8");
        const courses = JSON.parse(data);
        setTimeout(() => {
            res.send(courses).status(200);
        }, 1000);
        return;
    } catch (error) {
        console.log("Error al buscar cursos", error);
    }
};

const getCourse = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const data = await fs.readFile(coursesFile, "utf-8");
        const courses = JSON.parse(data);
        const course = courses.find((course) => course.id === id);
        return res.status(200).json({ course, message: "Consulta exitosa", success: true });
    } catch (error) {
        console.log("Error en consulta", error);
    }
};

const getCourseName = async (req, res) => {
    let name = req.params.name;
    try {
        const data = await fs.readFile(coursesFile, "utf-8");
        const courses = JSON.parse(data);
        const course = courses.find((course) => course.name == name);
        let messageResult = "";
        let status = false;
        if (course == undefined) {
            messageResult = "El nombre del curso no existe";
            status = false;
        } else {
            messageResult = "Consulta exitosa";
            status = true;
        }
        return res.status(200).json({ course, message: messageResult, success: status });
    } catch (error) {
        console.log("Error en la consulta", error);
    }
};

const updateCourse = async (req, res) => {
    let id = parseInt(req.params.id);
    let newData = {
        id: parseInt(req.body.id),
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        active: req.body.active,
        start: req.body.start,
        end: req.body.end,
    };
    try {
        const data = await fs.readFile(coursesFile, "utf-8");
        const courses = JSON.parse(data);
        const index = courses.findIndex((item) => item.id === id);
        if (index >= 0) {
            courses[index] = newData;
            await fs.writeFile(coursesFile, JSON.stringify(courses, null, 2));
        }
        return res.status(200).json({ message: "Registro actualizado", success: true });
    } catch (error) {
        console.log(error);
    }
};

const deleteCourse = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const data = await fs.readFile(coursesFile, "utf-8");
        const courses = JSON.parse(data);
        const index = courses.findIndex((item) => item.id === id);
        if (index >= 0) {
            courses.splice(index, 1);
            await fs.writeFile(coursesFile, JSON.stringify(courses, null, 2));
        }
        return res.status(204).send({ message: "Registro eliminado con éxito", success: true });
    } catch (error) {
        console.log(error);
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
    addCourse,
    getCourses,
    getCourse,
    getCourseName,
    updateCourse,
    deleteCourse
};