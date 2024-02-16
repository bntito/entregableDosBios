const fs = require("fs").promises;
const contactFile = "src/json/contact.json";

const addContact = async (req, res) => {
    let newContact = {
        id: parseInt(req.body.id),
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        comment: req.body.comment,
    };
    try {
        const data = await fs.readFile(contactFile, "utf-8");
        const contacts = JSON.parse(data);
        const id = getNextId(contacts);
        newContact.id = id;
        contacts.push(newContact);
        await fs.writeFile(contactFile, JSON.stringify(contacts, null, 2));
        return res.status(201).send({ message: "Se registro el comentario", success: true });
    } catch (error) {
        console.log(error);
    }
};

const getContacts = async (req, res) => {
    try {
        const data = await fs.readFile(contactFile, "utf-8");
        const contacts = JSON.parse(data);
        setTimeout(() => {
            res.send(contacts).status(200);
        }, 1000);
        return;
    } catch (error) {
        console.log("Error al buscar comentario", error);
    }
};

const getContact = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const data = await fs.readFile(contactFile, "utf-8");
        const contacts = JSON.parse(data);
        const contact = contacts.find((contact) => contact.id === id);
        return res.status(200).json({ contact, message: "Consulta exitosa", success: true });
    } catch (error) {
        console.log("Error en la consulta", error);
    }
};

const getContactEmail = async (req, res) => {
    let email = req.params.email;
    try {
        const data = await fs.readFile(contactFile, "utf-8");
        const contacts = JSON.parse(data);
        const contact = contacts.find((contact) => contact.email == email);
        let messageResult = "";
        let status = false;
        if (!contact) {
            messageResult = "El email no está registrado en los comentarios";
            status = false;
        } else {
            messageResult = "Consulta exitosa";
            status = true;
        }
        return res.status(200).json({ contact, message: messageResult, success: status });
    } catch (error) {
        console.log("Error en la consulta", error);
        return res.status(500).json({ message: "Error en la consolta", success: false });
    }
};

const updateContact = async (req, res) => {
    let id = parseInt(req.params.id);
    let newData = {
        id: parseInt(req.params.id),
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        comment: req.body.comment,
    };
    try {
        const data = await fs.readFile(contactFile, "utf-8");
        const contacts = JSON.parse(data);
        const index = contacts.findIndex((item) => item.id === id);
        if (index >= 0) {
            contacts[index] = newData;
            await fs.writeFile(contactFile, JSON.stringify(contacts, null, 2));
        }
        return res.status(200).json({ message: "Comentario actualizado", success: true })
    } catch (error) {
        console.log(error);
    }
};

const deleteContact = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const data = await fs.readFile(contactFile, "utf-8");
        const contacts = JSON.parse(data);
        const index = contacts.findIndex((contact) => contact.id === id);
        if (index >= 0) {
            contacts.splice(index, 1);
            await fs.writeFile(contactFile, JSON.stringify(contacts, null, 2));
        }
        return res.status(200).send({ message: "Comentario eliminado con éxito", success: true });
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
    addContact,
    getContact,
    getContacts,
    getContactEmail,
    updateContact,
    deleteContact
};

