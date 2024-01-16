const Carrito = require('../models/Carrito');
const Usuario = require('../models/Usuario');
const Bicicleta = require('../models/Bicicleta');
import { Request, Response } from 'express';

// Obtener todos los elementos del carrito de un usuario
exports.getCarritoByUsuario = async (req: Request, res: Response) => {
    try {
        const cedula = req.params.cedula; // asumiendo que la cedula está en los parámetros de la URL
        const carrito = await Carrito.findAll({
            where: { Cedula: cedula },
            include: [Usuario, Bicicleta],
        });
        res.json(carrito);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Agregar un producto al carrito
exports.addToCarrito = async (req: Request, res: Response) => {
    try {
        const { cedula, bikeId, horasSeleccionadas, fechaInicio, fechaFinalizacion, precioTotal } = req.body;
        const newCartItem = await Carrito.create({
            Cedula: cedula,
            BikeID: bikeId,
            HorasSeleccionadas: horasSeleccionadas,
            FechaInicio: fechaInicio,
            FechaFinalizacion: fechaFinalizacion,
            PrecioTotal: precioTotal,
        });
        res.status(201).json(newCartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
// Eliminar un producto del carrito
exports.removeFromCarrito = async (req: Request, res: Response) => {
    try {
        const carritoId = req.params.carritoId;
        const carrito = await Carrito.findByPk(carritoId);

        if (!carrito) {
            return res.status(404).json({ message: 'El producto en el carrito no fue encontrado' });
        }

        await carrito.destroy();
        res.json({ message: 'Producto eliminado del carrito exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};