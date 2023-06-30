import express from "express";
import dotenv from "dotenv";
import DBconnection  from "./config/database.js";
import authroute from "./routes/authroute.js"
import categoryroute from "./routes/categoryroute.js"
import productroute from "./routes/productroute.js"
import offerroute from "./routes/offerroute.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url";


dotenv.config();
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename); 
const app=express();

app.use(cors()) 
// database connection function
DBconnection();

// middleware
app.use(express.json());
// app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, './client/build')))

// server start page
app.use("/authroute",authroute);
app.use("/category",categoryroute);
app.use("/product",productroute);
app.use("/offer",offerroute);


app.use("*", function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`);
})