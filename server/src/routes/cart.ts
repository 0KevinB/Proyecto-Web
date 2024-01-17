import validateToken from './validate-token';
import { Router } from 'express';
import { addToCarrito, getCarritoByUsuario, removeFromCarrito } from '../controlers/carrito'
const router = Router();

// Obtener el carrito de un usuario
router.get('/obtener/:cedula', getCarritoByUsuario);

// Agregar un producto al carrito
router.post('/agregar', addToCarrito);

// Eliminar un producto del carrito
router.delete('/:carritoId', removeFromCarrito);

export default router;
