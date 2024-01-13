import { Router } from 'express';
import { obtenerUbicacion, obtenerUbicacionPorBicicletaId } from '../controlers/ubicacion';

import validateToken from './validate-token';

const router = Router();

router.get('/', validateToken,obtenerUbicacion);

router.get('/bicicleta/:bikeId', validateToken, obtenerUbicacionPorBicicletaId);

export default router;