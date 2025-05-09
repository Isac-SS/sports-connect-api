import express from 'express';
const router = express.Router();

import { 
    event,
    create,
    eventById,
    updateEvent,
    deleteEvent
} from "../controllers/eventos.js";

router.get('/eventos', event);
router.post('/eventos/novo', create);
router.get('/eventos/buscar/:id', eventById);
router.put('/eventos/editar/:id', updateEvent);
router.delete('/eventos/excluir/:id', deleteEvent);

export default router;
