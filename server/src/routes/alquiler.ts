// Importa el controlador
import { getAlquilerByCedula } from '../controlers/alquiler';

// Importa Router de express
import { Router } from 'express';
const router = Router();

// Ruta para obtener el estado de alquiler por cédula
router.get('/alquiler/:cedula', getAlquilerByCedula);

export default router;
