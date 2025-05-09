import atletasMd from "../models/atleta-schema.js";

export function home(req, res) {
  res.status(200).send("SportsConnect");
}

export async function atletas(req, res) {
  const listaAtletas = await atletasMd.find();
  return res.status(200).json(listaAtletas);
}

export async function create(req, res) {
  const data = req.body;
  if (!data.nome || !data.cpf) {
      return res.status(400).send("Cadastro incompleto! Preencha os campos corretamente.");
  }

  const ultimoAtleta = await atletasMd.aggregate([
      { $group: { _id: null, maxCod: { $max: "$cod" } } }
  ]);

  const novoCod = (ultimoAtleta.length > 0) ? ultimoAtleta[0].maxCod + 1 : 1;

  const atleta = new atletasMd({ ...data, cod: novoCod });
  const atletaSalvo = await atleta.save();

  return res.status(201).json({ ...atletaSalvo.toObject(), cod: novoCod });
}

export async function searchByCod(req, res) {
 
  try {
    let filtro = req.query.filtro;

    let atletaEncontrado;

    filtro = filtro.toString();

    if (/^[0-9a-fA-F]{24}$/.test(filtro)) {
      atletaEncontrado = await atletasMd.findOne({ cod: filtro });
    } else {
      atletaEncontrado = await atletasMd.findOne({ nome: { $regex: filtro, $options: 'i' } });
    }

    if (!atletaEncontrado) {
      return res.status(404).json({ mensagem: "Atleta não encontrado." });
    }

    return res.json({ ...atletaEncontrado.toObject(), cod: atletaEncontrado.cod });
  } catch (error) {
    console.error('Erro ao filtrar atletas', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}



export async function updateAthleteByCod(req, res) {
  const atletaEncontrado = await atletasMd.findOne({ cod: req.params.cod });

  if (!atletaEncontrado) {
    return res.status(404).json({ mensagem: "Atleta não encontrado." });
  }

  const { cod, ...data } = req.body;  
  await atletasMd.updateOne({ cod: req.params.cod }, data);

  const atletaAtualizado = { ...atletaEncontrado.toObject(), ...data };

  return res.json(atletaAtualizado);
}

export async function deleteAthleteByCod(req, res) {
  const atletaEncontrado = await atletasMd.findOne({ cod: req.params.cod });

  if (!atletaEncontrado) {
    res.status(404).json({ mensagem: "Atleta não encontrado." });
  } else {
    await atletasMd.deleteOne({ cod: req.params.cod });
    return res.status(200).json({});
  }
}