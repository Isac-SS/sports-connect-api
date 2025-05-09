import express from "express";
import cors from "cors";
import db from "./config/dbConnect.js";

db.on("error", console.log.bind(console, 'Erro de conexão!'));
db.once("open", () => console.log("Conexão com o banco feita com sucesso!"));

const app =  express();
app.use(cors());

export default app;