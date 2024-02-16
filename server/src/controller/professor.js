const { doesNotMatch } = require("assert");

const fs = require("fs").promises;
const professorsFile = "src/json/professor.json";
const courseFile = "src/json/course.json";

const addProfessor = async (req, res) => {
    let newProfessor = {
        id: parseInt(req.body.id),
        course: req.body.course,
        codeCourse: req.body.codeCourse,
        cost: req.body.cost,
        dni: req.body.dni,
        name: req.body.name,
        lastname: req.body.lastname,
        country: req.body.country,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        active: req.body.active,
    };

    try {
        const dataProfessors = await fs.readFile(professorsFile, "utf-8");
        const dataCourses = await fs.readFile(courseFile, "utf-8");
        const professors = JSON.parse(dataProfessors);
        const courses = JSON.parse(dataCourses);

        let id = getNextId(professors);
        newProfessor.id = id;

        const matchCourse = courses.find((course) => course.code == req.body.codeCourse);
        const professorInCourse = matchCourse && matchCourse.relationCP && matchCourse.relationCP.some(relation => relation.dniProfessor.includes(req.body.dni));

        if (professorInCourse) {
            return res.status(400).send({
                message: "El profesor ya esta registrado en este curso", success: false
            });
        }

        const professor = professors.find((professor) => professor.dni == req.body.dni);
        if (professor) {
            return res.status(400).send({
                message: "Profesor ya registrado", success: false
            });
        }

        if (matchCourse) {
            if (!matchCourse.relationCP) {
                matchCourse.relationCP = [];
            }
            let courseRelation = matchCourse.relationCP.find(relation => relation.code === req.body.codeCourse);
            if (!courseRelation) {
                courseRelation = { code: req.body.codeCourse, dniProfessor: [] };
                matchCourse.relationCP.push(courseRelation);
            }
            
            courseRelation.dniProfessor.push(req.body.dni);
            await fs.writeFile(courseFile, JSON.stringify(courses, null, 2));
        }
        professors.push(newProfessor);
        await fs.writeFile(professorsFile, JSON.stringify(professors, null, 2));
        return res.status(201).send({ message: "Registro de profesor exitoso", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error interno del servidor", success: false });
    }  
};

const getProfessors = async (req, res) => {
    try {
        const data = await fs.readFile(professorsFile, "utf-8");
        const professors = JSON.parse(data);
        setTimeout(() => {
            res.send(professors).status(200);
        }, 1000);
        return;
    } catch (error) {
        console.log("Error al buscar profesores", error);
    }
};

const getProfessor = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const data = await fs.readFile(professorsFile, "utf-8");
        const professors = JSON.parse(data);
        const professor = professors.find((professor) => professor.id === id);
        return res.status(200).json({ professor, message: "Consulta exitosa", success: true });
    } catch (error) {
        console.log("Error en consulta", error);
    }
};

const getProfessorDni = async (req, res) => {
    let dni = parseInt(req.params.dni);
    try {
        const data = await fs.readFile(professorsFile, "utf-8");
        const professors = JSON.parse(data);
        const professor = professors.find((professor) => professor.dni == dni);
        let messageResult = "";
        let status = false;
        if (professor == undefined) {
            messageResult = "El DNI ingresado no existe";
            status = false;
        } else {
            messageResult = "Consulta exitosa";
            status = true;
        }
        return res.status(200).json({ professor, message: messageResult, success: status });
    } catch (error) {
        console.log("Error en la consulta", error);
    }
};

const updateProfessor = async (req, res) => {
    let id = parseInt(req.params.id);
    let newData = {
        id: parseInt(req.body.id),
        course: req.body.course,
        cost: req.body.cost,
        dni: req.body.dni,
        name: req.body.name,
        lastname: req.body.lastname,
        country: req.body.country,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        active: req.body.active,
    };
    try {
        const data = await fs.readFile(professorsFile, "utf-8");
        const professors = JSON.parse(data);
        const index = professors.findIndex((item) => item.id === id);
        if (index >= 0) {
            professors[index] = newData;
            await fs.writeFile(professorsFile, JSON.stringify(professors, null, 2));
        }
        return res.status(200).json({ message: "Registro actualizado", success: true });
    } catch (error) {
        console.log(error);
    }
};

const deleteProfessor = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const dataProfessors =  await fs.readFile(professorsFile, "utf-8");
        const dataCourses = await fs.readFile(courseFile, "utf-8");
        const professors = JSON.parse(dataProfessors);
        const courses = JSON.parse(dataCourses);
        
        const index = professors.findIndex((item) => item.id === id);
        
        if (index !== -1) {
            const dniProfessorFound = professors[index].dni;
            professors.splice(index, 1);
            await fs.writeFile(professorsFile, JSON.stringify(professors, null, 2));
            
            courses.forEach(course => {
                if (course.relationCP && Array.isArray(course.relationCP) && course.relationCP.length > 0) {
                    let dniProfessor = course.relationCP[0].dniProfessor;
                    if (dniProfessor && Array.isArray(dniProfessor) && dniProfessor.length > 0) {
                        course.relationCP[0].dniProfessor = dniProfessor.filter(dni => dni !== dniProfessorFound);
                    }
                }
            });

            await fs.writeFile(courseFile, JSON.stringify(courses, null, 2));
            res.status(200).json({ message: "El profesor y su DNI han sido eliminados correctamente", success: false });
        } else {
            res.satatus(404).json({ error: "No se encontró ningún profesor con el ID", success: false });
        }
    } catch (error) {
        console.error("Error al eliminar el profesor y su DNI:", error);
        res.status(500).json({ error: "Error interno del servidor", success: false });
    }
};

function getNextId(data) {
    if (data.length === 0) {
        return 1;
    }
    const maxId = Math.max(...data.map((item) => item.id));
    return maxId + 1;
}

module.exports = {
    addProfessor,
    getProfessors,
    getProfessor,
    getProfessorDni,
    updateProfessor,
    deleteProfessor
};