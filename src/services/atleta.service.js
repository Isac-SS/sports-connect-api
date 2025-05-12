import Atleta from '../models/atleta-schema'

export async function listarAtletas(params) {
    return await Atleta.find();
}

export async function criarAtleta(data) {
    if(!data.nome || !data.cpf) {
        throw new Error("Cadastro incompleto! Preencha os campos corretamente.")
    }

    const ultimo = await Atleta.agrregate([
        { $group :{ _id: null, maxCod: {$max: "$cod" }}}
    ]);

    const novoCod = (ultimo.length > 0) ? ultimo[0].maxCod + 1 : 1;

    const novoAtleta = new Atleta({ ...data, cod: novoCod })
    return await novoAtleta.save();
}

export async function buscarAtletaPorFiltro(filtro) {
  let atleta;

  if (/^[0-9]+$/.test(filtro)) {
    atleta = await Atleta.findOne({ cod: parseInt(filtro) });
  } else {
    atleta = await Atleta.findOne({ nome: { $regex: filtro, $options: 'i' } });
  }

  return atleta;
}

export async function atualizarAtleta(cod, data) {
  const atleta = await Atleta.findOne({ cod });

  if (!atleta) {
    throw new Error("Atleta não encontrado.");
  }

  await Atleta.updateOne({ cod }, data);
  return { ...atleta.toObject(), ...data };
}

export async function deletarAtleta(cod) {
  const atleta = await Atleta.findOne({ cod });

  if (!atleta) {
    throw new Error("Atleta não encontrado.");
  }

  await Atleta.deleteOne({ cod });
}