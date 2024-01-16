"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Carrito = require('../models/Carrito');
const Usuario = require('../models/Usuario');
const Bicicleta = require('../models/Bicicleta');
// Obtener todos los elementos del carrito de un usuario
exports.getCarritoByUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cedula = req.params.cedula; // asumiendo que la cedula está en los parámetros de la URL
        const carrito = yield Carrito.findAll({
            where: { Cedula: cedula },
            include: [Usuario, Bicicleta],
        });
        res.json(carrito);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
// Agregar un producto al carrito
exports.addToCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cedula, bikeId, horasSeleccionadas, fechaInicio, fechaFinalizacion, precioTotal } = req.body;
        const newCartItem = yield Carrito.create({
            Cedula: cedula,
            BikeID: bikeId,
            HorasSeleccionadas: horasSeleccionadas,
            FechaInicio: fechaInicio,
            FechaFinalizacion: fechaFinalizacion,
            PrecioTotal: precioTotal,
        });
        res.status(201).json(newCartItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
// Eliminar un producto del carrito
exports.removeFromCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carritoId = req.params.carritoId;
        const carrito = yield Carrito.findByPk(carritoId);
        if (!carrito) {
            return res.status(404).json({ message: 'El producto en el carrito no fue encontrado' });
        }
        yield carrito.destroy();
        res.json({ message: 'Producto eliminado del carrito exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
