import { Router} from 'express';
import { getProducts } from '../controlers/bicicleta';
import validateToken from './validate-token';

const router = Router();
router.get('/',validateToken, getProducts)

export default router