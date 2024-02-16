const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/public/html/welcome.html")
});

app.use("/api", require("./routes/courseRoute.js"));
app.use("/api", require("./routes/professorRoute.js"));
app.use("/api", require("./routes/studentRoute.js"));
app.use("/api", require("./routes/contactRoute.js"));
app.use("/api", require("./routes/professorCourseRoute.js"));
app.use("/api", require("./routes/transactionalRoute.js"));

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/html/404.html")
});

app.listen(port, () => {
    console.log(`Servidor disponible en http://localhost:${port}`)
});