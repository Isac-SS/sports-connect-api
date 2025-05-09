import express from 'express';
const router = express.Router();

import { 
    home,
    atletas,
    create,
    searchByCod,
    updateAthleteByCod,
    deleteAthleteByCod
} from "../controllers/atletas.js";


router.get('/', home);
router.get('/atletas', atletas);
router.post('/atleta/cadastro', create);
router.get('/atletas/buscar/:cod', searchByCod);
router.put('/atletas/editar/:cod', updateAthleteByCod);
router.delete('/atletas/excluir/:cod', deleteAthleteByCod);



export default router;