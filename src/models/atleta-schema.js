import mongoose from "mongoose";

const atletaSchema = new mongoose.Schema(
    {
        cod: { type: Number, unique: true, required: true },
        nome: {type: String, required: true},
        cpf: {type: Number, required: true},
        embarcacoes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Embarcacao' }]
    }
);

const atletasMd = mongoose.model('atletas', atletaSchema);
export default atletasMd;