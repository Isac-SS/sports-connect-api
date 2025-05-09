import express from "express";
import cors from "cors";
import db from "./config/dbConnect.js";

db.on("error", console.log.bind(console, 'Erro de conexão!'));
db.once("open", () => console.log("Conexão com o banco feita com sucesso!"));

//import routes
import homeRouter from './routers/atleta-routes.js';
import atletasRouter from './routers/atleta-routes.js';
import createRouter from './routers/atleta-routes.js';
import searchByIdRouter from './routers/atleta-routes.js';
import  updateAthleteRouter  from "./routers/atleta-routes.js";
import  deleteAthleteRouter  from "./routers/atleta-routes.js";

import eventRouter from "./routers/evento-routes.js" 
import newEventRouter from "./routers/evento-routes.js" 
import eventByIdRouter from "./routers/evento-routes.js" 
import updateEventRouter from "./routers/evento-routes.js" 
import deleteEventRouter from "./routers/evento-routes.js" 

import vesselRouter from "./routers/embarcacao-routes.js"
import newVesselRouter from "./routers/embarcacao-routes.js"
import searchVesselRouter from "./routers/embarcacao-routes.js"
import updateVesselRouter from "./routers/embarcacao-routes.js"
import deleteVesselRouter from "./routers/embarcacao-routes.js"

const app =  express();
app.use(cors());

app.use(express.json());
app.use('/api', homeRouter);
app.use('/api', atletasRouter);
app.use('/api', createRouter);
app.use('/api', searchByIdRouter);
app.use('/api', updateAthleteRouter);
app.use('/api', deleteAthleteRouter);

app.use('/api', eventRouter);
app.use('/api', newEventRouter);
app.use('/api', eventByIdRouter);
app.use('/api', updateEventRouter);
app.use('/api', deleteEventRouter);

app.use('/api', vesselRouter);
app.use('/api', newVesselRouter);
app.use('/api', searchVesselRouter);
app.use('/api', updateVesselRouter);
app.use('/api', deleteVesselRouter);


export default app;