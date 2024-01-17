"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carrito_1 = require("../controlers/carrito");
const alquiler_1 = require("../controlers/alquiler");
const router = (0, express_1.Router)();
// Obtener el carrito de un usuario
router.get('/obtener/:cedula', carrito_1.getCarritoByUsuario);
// Agregar un producto al carrito
router.post('/agregar', carrito_1.addToCarrito);
// Eliminar un producto del carrito
router.delete('/:carritoId', carrito_1.removeFromCarrito);
// Ruta para obtener el estado de alquiler por cédula
router.get('/alquiler/:cedula', alquiler_1.getAlquilerByCedula);
router.get('/alquiler', alquiler_1.getAlquiler);
exports.default = router;
