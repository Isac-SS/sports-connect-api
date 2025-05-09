import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema(
    {
        id: {type: String, unique: true, required: true},
        nome: {type: String, required: true},
        dataEvento: { type: Date, required: true },
        inicioInscricoes: { type: Date, required: true },
        fimInscricoes: { type: Date, required: true }
    }
);

const Evento = mongoose.model('eventos', eventoSchema);
export default Evento;