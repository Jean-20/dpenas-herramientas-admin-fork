import {Router} from 'express';
import { createReservacion, deleteReservacion, getHorarios, getTableReservas, putReservacion } from '../controllers/reserva.controller.js';


const router = Router();

router.get('/reservas/tablereservas', getTableReservas);

router.post('/reservas/createreserva', createReservacion);
router.put('/reservas/updatereserva/:id', putReservacion);
router.delete('/reservas/deletereserva/:id', deleteReservacion);

router.get('/reservas/horarios', getHorarios);



export default router;