import { Router } from 'express';
import validateToken from './validate-token';
import {
    obtenerBicicletas,
    crearBicicleta,
    obtenerBicicletaPorID,
    actualizarBicicleta,
    eliminarBicicleta,
} from '../controlers/bicicleta';

const router = Router();

// Obtener todas las bicicletas
router.get('/', validateToken, obtenerBicicletas);

// Crear una nueva bicicleta
router.post('/', validateToken, crearBicicleta);

// Obtener una bicicleta por su ID
router.get('/:BikeID', validateToken, obtenerBicicletaPorID);

// Actualizar una bicicleta por su ID
router.put('/:BikeID', validateToken, actualizarBicicleta);

// Eliminar una bicicleta por su ID
router.delete('/:BikeID', validateToken, eliminarBicicleta);

export default router;