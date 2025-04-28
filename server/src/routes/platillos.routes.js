import {Router} from 'express';
import { createPlatillo, deletePlatillo, getCategoriasPlatillos, getTablePlatillos, updatePlatillo } from '../controllers/platillos.controller.js';


const router = Router();

router.post('/platillos/createplatillo', createPlatillo);

router.put('/platillos/updateplatillo/:id', updatePlatillo);

router.delete('/platillos/deleteplatillo/:id', deletePlatillo);

router.get('/platillos/tableplatillos', getTablePlatillos);

router.get('/platillos/getcategorias', getCategoriasPlatillos)

export default router;