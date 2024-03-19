import { Router } from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = Router();
const PROJECTS_COLLECTION = db.collection("projects");

//End point to get all projects
router.get('/', async (req,res)=>{
let projectResults = await PROJECTS_COLLECTION.find({}).toArray();
res.send(projectResults).status(200);
});

//Endpoint to get a single project by id
router.get('/:id', async(req,res)=>{
let query = {_id: new ObjectId (req.params.id)};
let oneProjectResult = await PROJECTS_COLLECTION.findOne(query);

if (!oneProjectResult) res.send("Not found").status(404);
else res.send(oneProjectResult).status(200);
});

//Endpoint to add a project (project details to add-->name, link, description,image )
router.post("/", async (req, res) => {
    try {
        let newProject = {
            project: req.body.project,
            link: req.body.link,
            description: req.body.description,
            image: req.body.image

        };
        let newProjectResults = await PROJECTS_COLLECTION.insertOne(newProject);
        res.send(newProjectResults).status(201);
    }
    catch(error) {
        console.error(error);
    }
});

// Endpoint for updating a project by id
router.patch("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)};
        const update = {
            $set: {
                project: req.body.project,
                link: req.body.link,
                description: req.body.description,
                image: req.body.image
                  }

        };
        let updateProjectResults = await PROJECTS_COLLECTION.updateOne(query, update);
        res.send(updateProjectResults).status(201);
    } 
    catch (error){
    console.error(error);

    }
});

// Endpoint for deleting a single skill by id
router.delete('/:id', async (req, res)=>{
    try {
      const query = { _id: new ObjectId(req.params.id) };
        let deleteProjectResults = await PROJECTS_COLLECTION.deleteOne(query);
        res.send(deleteProjectResults).status(202);
    } catch (error) {
      console.error(error)
    }
    });
    
    export default router;