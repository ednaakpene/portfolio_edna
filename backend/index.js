import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import skillsRouter from "./routes/skills.routes.js"
import projectsRouter from "./routes/projects.routes.js"


const PORT = process.env.PORT || 4000;

const app = express()

// add middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/skills", skillsRouter);
app.use("/projects", projectsRouter);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})
