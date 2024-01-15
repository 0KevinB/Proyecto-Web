import { Router } from 'express';
import { actualizarUbicacion, obtenerUbicacion, obtenerUbicacionPorBicicletaId } from '../controlers/ubicacion';

import validateToken from './validate-token';

const router = Router();

router.get('/', validateToken, obtenerUbicacion);

router.get('/bicicleta/:bikeId', validateToken, obtenerUbicacionPorBicicletaId);

router.put('/updateUbicacion/:ubicacionId', actualizarUbicacion);

export default router;