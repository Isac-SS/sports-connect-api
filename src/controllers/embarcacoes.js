import Embarcacoes from '../models/embarcacao-schema.js';

export async function vessels(req, res) {
    const listaEmbarcacoes = await Embarcacoes.find();
    return res.status(200).json(listaEmbarcacoes);
  }

export async function create(req, res) {
    const data = req.body;
   
    if (!data) {
        return res.status(400).send("Não foi possível criar essa embarcação.");
    }

    const embarcacao = new Embarcacoes(data);
    const embarcacaoSalva = await embarcacao.save();
    return res.status(201).json(embarcacaoSalva); 
}

export async function vesselByCod(req, res) {
    let embarcacaoEncontrada = await Embarcacoes.findOne({cod: req.params.cod} || {nome: req.params.nome});

    if (!embarcacaoEncontrada) {
        res.status(404).json({ mensagem: 'Não foi possivel encontrar esta embarcação.' });
    } else {
        res.status(200).json(embarcacaoEncontrada);
    }
  }  

export async function updateVessel(req, res) {
    
    try {
        let embarcacaoEncontrada = await Embarcacoes.findOne({ cod: req.params.cod });
        
        if (!embarcacaoEncontrada) {
            return res.status(404).json({ mensagem: 'Não foi possível encontrar esta embarcação.' });
        }
        
        const { nome, atletasMarcados } = req.body;
        
        await Embarcacoes.updateOne({ cod: req.params.cod }, {
            nome, atletasMarcados
        });

        return res.json(embarcacaoEncontrada);
    } catch (error) {
        console.error('Erro ao atualizar embarcação:', error);
        return res.status(500).json({ mensagem: 'Ocorreu um erro ao atualizar a embarcação.' });
    }
}


export async function deleteVessel(req, res) {
    const embarcacaoEncontrada = await Embarcacoes.findOne({cod: req.params.cod});
    
    if (!embarcacaoEncontrada) {
        res.status(404).json({ mensagem: 'Não foi possível encontrar esta embarcação.' });
    } else {
        await Embarcacoes.deleteOne({cod: req.params.cod});
        return res.status(200).json({});
    }
} 