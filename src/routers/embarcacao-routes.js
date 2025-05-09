import express from 'express';
const router = express.Router();

import { 
    vessels,
    create,
    vesselByCod,
    updateVessel,
    deleteVessel

} from "../controllers/embarcacoes.js";

router.get('/embarcacoes', vessels);
router.post('/embarcacoes/nova', create);
router.get('/embarcacoes/buscar/:cod', vesselByCod);
router.put('/embarcacoes/editar/:cod', updateVessel);
router.delete('/embarcacoes/excluir/:cod', deleteVessel);




export default router;