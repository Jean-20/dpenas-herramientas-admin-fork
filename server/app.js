import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authAdminRoutes from './src/routes/authAdmin.routes.js'
import platillosRoutes from './src/routes/platillos.routes.js'
import MesasRoutes from './src/routes/mesas.routes.js'
import ReservaRoutes from './src/routes/reservas.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authAdminRoutes);
app.use("/api", platillosRoutes);
app.use("/api", MesasRoutes)
app.use('/api', ReservaRoutes)

export default app;