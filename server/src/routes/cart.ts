import validateToken from './validate-token';
import { Router } from 'express';
import { addToCarrito, getCarritoByUsuario, removeFromCarrito } from '../controlers/carrito'
import { getAlquiler, getAlquilerByCedula } from '../controlers/alquiler';
const router = Router();

// Obtener el carrito de un usuario
router.get('/obtener/:cedula', getCarritoByUsuario);

// Agregar un producto al carrito
router.post('/agregar', addToCarrito);

// Eliminar un producto del carrito
router.delete('/:carritoId', removeFromCarrito);

// Ruta para obtener el estado de alquiler por cédula
router.get('/alquiler/:cedula', getAlquilerByCedula);
router.get('/alquiler', getAlquiler);
export default router;
