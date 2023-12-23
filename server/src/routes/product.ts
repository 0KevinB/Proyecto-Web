import { Router } from 'express';
import { obtenerBicicletas } from '../controlers/bicicleta';
import validateToken from './validate-token';

const router = Router();
router.get('/', validateToken, obtenerBicicletas);

export default router;