import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DB_CONNECT);

let db = mongoose.connection;

export default db;