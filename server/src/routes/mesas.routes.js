import {Router} from 'express';
import { createMesa, deleteMesa, getTableMesas, updateMesa } from '../controllers/mesas.controller.js';


const router = Router();

router.post('/mesas/createmesa', createMesa);

router.put('/mesas/updatemesa/:id', updateMesa);

router.delete('/mesas/deletemesa/:id', deleteMesa);


router.get('/mesas/tablemesas', getTableMesas);

export default router;