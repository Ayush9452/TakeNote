import express from "express";
import cors from "cors";
import db from "./db.js";
import dotenv from "dotenv";

const app = express();
dotenv.config({path: "./.env"});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT;

// create a todo
app.post("/todos",async(req,res)=>{
    try{
        const result = await db.query("INSERT INTO todo(title,content) VALUES ($1,$2) RETURNING *",[req.body.title,req.body.content]);
        res.json(result.rows[0]);
    }catch(err){
        console.log(err);
    }
});

// get all todo
app.get("/todos",async(req,res)=>{
    try{
        const result = await db.query("SELECT * FROM todo");
        res.json(result.rows);
    }catch(err){
        console.log(err);
    }
});

// get a todo
app.get("/todos/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const result = await db.query("SELECT * FROM todo WHERE id = $1",[id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
    }
});

// update a todo
app.post("/todos/:id",async(req,res)=>{
    const {title, content} = req.body;
    const {id} = req.params;
    try {
        const result = await db.query("UPDATE todo SET title = $1, content = $2 WHERE id = $3 RETURNING *",[title,content,id]);
        res.json(result.rows[0]);
    } catch (err) {
        console.log(err);
    }
});

// delete a todo
app.delete("/todos/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const result = await db.query("DELETE FROM todo WHERE id = $1",[id]);
        res.json(`Deteted todo with id ${id}`);
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
