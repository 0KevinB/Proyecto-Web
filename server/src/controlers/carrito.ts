import Carrito from '../models/Carrito';
import Usuario from '../models/usuario';
import Bicicleta from '../models/bicicleta';
import { Request, Response } from 'express';
import { realizarAlquiler } from './alquiler';
import Alquiler from '../models/alquiler';
import Bicicleta_Ubicacion from '../models/Bicicleta_Ubicacion';

// Obtener todos los elementos del carrito de un usuario
export const getCarritoByUsuario = async (req: Request, res: Response) => {
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

// Agregar un producto al carrito y crear un registro de alquiler simultáneamente

export const addToCarrito = async (req: Request, res: Response) => {
    try {
        const { Cedula, Producto, CantidadHoras, PrecioTotal } = req.body;
        const { BikeID } = Producto;

        // Calcular la fecha actual
        const fechaInicio = new Date();

        // Calcular la fecha final como la fecha actual más las horas seleccionadas
        const fechaFinalizacion = new Date(fechaInicio);
        fechaFinalizacion.setHours(fechaFinalizacion.getHours() + CantidadHoras);

        // Obtener la LocationID de la tabla intermedia Bicicleta_Ubicacion
        const ubicacionBicicleta = await Bicicleta_Ubicacion.findOne({
            where: { BikeID: BikeID },
        });

        if (!ubicacionBicicleta) {
            return res.status(404).json({ message: 'Ubicación de bicicleta no encontrada' });
        }

        const { LocationID } = ubicacionBicicleta.toJSON(); // Extraer la LocationID del resultado

        // Crear un nuevo registro en la tabla Carrito
        const newCartItem = await Carrito.create({
            Cedula: Cedula,
            BikeID: BikeID,
            HorasSeleccionadas: CantidadHoras,
            FechaInicio: fechaInicio,
            FechaFinalizacion: fechaFinalizacion,
            PrecioTotal: PrecioTotal,
        });

        // Crear un nuevo registro en la tabla Alquiler
        const newRental = await Alquiler.create({
            Cedula: Cedula,
            BikeID: BikeID,
            FechaInicio: fechaInicio,
            FechaFin: fechaFinalizacion,
            EstadoAlquiler: 'Pendiente',
            MontoTotal: PrecioTotal,
            LocationID: LocationID,
        });

        console.log('back - Carrito', newCartItem);
        console.log('back - Alquiler', newRental);

        res.status(201).json({ carrito: newCartItem, alquiler: newRental });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Agregar un producto al carrito
/*
export const addToCarrito = async (req: Request, res: Response) => {
    try {
        const { Cedula, Producto, CantidadHoras, PrecioTotal } = req.body;
        const { BikeID } = Producto;

        // Calcular la fecha actual
        const fechaInicio = new Date();

        // Calcular la fecha final como la fecha actual más las horas seleccionadas
        const fechaFinalizacion = new Date(fechaInicio);
        fechaFinalizacion.setHours(fechaFinalizacion.getHours() + CantidadHoras);

        const newCartItem = await Carrito.create({
            Cedula: Cedula,
            BikeID: BikeID,
            HorasSeleccionadas: CantidadHoras,
            FechaInicio: fechaInicio,
            FechaFinalizacion: fechaFinalizacion,
            PrecioTotal: PrecioTotal,
        });
        console.log('back', newCartItem);
        res.status(201).json(newCartItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
*/
export const removeFromCarrito = async (req: Request, res: Response) => {
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