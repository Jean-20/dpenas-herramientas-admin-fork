import {Router} from 'express';
import { /* register */ login, logout, profile, verifyToken} from "../controllers/authAdmin.controller.js";
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginSchema, /* registerSchema */ } from '../schemas/authAdmin.schema.js';

const router = Router();
/* Modificar para que este acorde a SQL */

/* router.post('/registeradmin', validateSchema(registerSchema), register); */

router.post('/loginadmin', validateSchema(loginSchema), login);

router.post('/logoutadmin', logout);

/* router.get("/verifyadmin", verifyToken); */

router.get("/profileadmin", authRequired, profile);

export default router;