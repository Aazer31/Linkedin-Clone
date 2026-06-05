import express from "express";
import dotenv from "dotenv";
dotenv.config();

let app = express();
let port = process.env.PORT 
app.get("/", (req, res)=>{
    res.send("Hello World");
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
})