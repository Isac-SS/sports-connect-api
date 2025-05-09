import Evento from "../models/Eventos.js";

// const listaEventos = [ 
//     {"id": "E1","nome": "Super Bowl", "dataEvento": "12-02-2023", "inicioInscricoes": "01-05-2022", "fimInscricoes": "29-07-2022" },
//     {"id": "E2", "nome": "Copa do Mundo", "dataEvento": "05-06-2023", "inicioInscricoes": "15-04-2022", "fimInscricoes": "20-08-2022" },
    
//   ]; 

  export async function event(req, res) {
    const listaEventos = await Evento.find();
    return res.status(200).json(listaEventos);
  }

  export async function create(req, res) {
    try {
      const data = req.body;
  
      if (!data.nome || !data.dataEvento || !data.inicioInscricoes || !data.fimInscricoes) {
        return res.status(400).send("Preencha os campos corretamente para criar um novo evento!");
      }
  
      const ultimoEvento = await Evento.findOne({}, {}, { sort: { 'id': -1 } });
  
      let ultimoNumero = 0;
      if (ultimoEvento && ultimoEvento.id) {
        const partes = ultimoEvento.id.split('E');
        if (partes.length === 2) {
          ultimoNumero = parseInt(partes[1], 10);
        }
      }
  
      const novoNumero = ultimoNumero + 1;
      const novoCodigo = `E${novoNumero}`;
  
      const novoEvento = new Evento({
        ...data,
        id: novoCodigo,
      });
  
      const eventoRegistrado = await novoEvento.save();
  
      return res.status(201).json(eventoRegistrado);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      return res.status(500).send("Erro interno ao criar um novo evento.");
    }
  }

  export async function eventById(req, res) {
    let eventoEncontrado = await Evento.findOne({id: req.params.id})

    if (!eventoEncontrado) {
      res.status(404).json({ mensagem: 'Evento não encontrado' });
    } else {
      res.status(200).json(eventoEncontrado);
    }
  }
  
  export async function updateEvent(req, res) {
    const eventoEncontrado = await Evento.findOne({id: req.params.id});

    if (!eventoEncontrado) {
      return res.status(404).json({ mensagem: "Evento não encontrado."})
    } else {
        const data = req.body;
        await Evento.updateOne({id: req.params.id}, data);
        res.json(data);
    }
  }

  export async function deleteEvent(req, res) {
    const eventoEncontrado = await Evento.findOne({id: req.params.id});

    if (!eventoEncontrado) {
        res.status(404).json({ mensagem: "Evento não encontrado." })
    } else {
        await Evento.deleteOne({id: req.params.id})
        res.status(200).json({});
    }
} 
