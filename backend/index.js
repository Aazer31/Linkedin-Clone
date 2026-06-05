import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

let app = express();
let port = process.env.PORT || 5000;
app.get("/", (req, res)=>{
    res.send("Hello World");
})

app.listen(port, ()=>{
    connectDB()
    console.log(`Server started on port ${port}`);
})