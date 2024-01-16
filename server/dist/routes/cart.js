"use strict";
const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
// Obtener el carrito de un usuario
router.get('/:cedula', carritoController.getCarritoByUsuario);
// Agregar un producto al carrito
router.post('/agregar', carritoController.addToCarrito);
// Eliminar un producto del carrito
router.delete('/:carritoId', carritoController.removeFromCarrito);
module.exports = router;
