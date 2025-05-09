import mongoose from "mongoose";

const embarcacaoSchema = new mongoose.Schema({
    cod: { type: Number, unique: true },
    nome: { type: String, required: true },
    atletasMarcados: [{ type: mongoose.Schema.Types.String, ref: 'Atleta' }]
});

embarcacaoSchema.pre('save', async function(next) {
    if (!this.cod) {
        const ultimaEmbarcacao = await Embarcacao.findOne({}, {}, { sort: { 'cod': -1 } });
        const ultimoCodigo = ultimaEmbarcacao ? ultimaEmbarcacao.cod : 0;
        this.cod = ultimoCodigo + 1;
    }
    next();
});

const Embarcacao = mongoose.model('Embarcacao', embarcacaoSchema);
export default Embarcacao;
