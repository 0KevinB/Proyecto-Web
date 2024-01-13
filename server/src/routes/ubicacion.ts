import { Router } from 'express';
import { obtenerUbicacion } from '../controlers/ubicacion';

import validateToken from './validate-token';

const router = Router();

router.get('/', validateToken,obtenerUbicacion);


export default router;