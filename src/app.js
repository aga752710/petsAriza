import express from 'express';
import 'dotenv/config.js';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { errorHandler } from './utils/errorHandler.js';

import usersRouter from './routes/user.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoptions.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import { logger } from './utils/logger.js';

const app = express();
const PORT = process.env.PORT||8080;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => logger.info("Conectado a la base de datos"))
    .catch(err => logger.error("Error en conexión a BD:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.use(errorHandler);

app.listen(PORT, () => logger.info(`Servidor escuchando en puerto ${PORT}`));
