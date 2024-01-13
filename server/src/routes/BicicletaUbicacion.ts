import { Router } from 'express';
import { obtenerBicicletaUbicacion } from '../controlers/BicicletaUbicacion';
import validateToken from './validate-token';

const router = Router();


router.get('/', validateToken,obtenerBicicletaUbicacion);


export default router;