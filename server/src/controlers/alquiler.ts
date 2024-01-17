// Importa los modelos necesarios
import { Request, Response } from 'express';
import Carrito from '../models/Carrito';
import Alquiler from '../models/alquiler';

export const realizarAlquiler = async (req: Request, res: Response) => {
    try {
        // Extrae los datos necesarios del cuerpo de la solicitud
        const { Cedula, BikeID, HorasSeleccionadas, PrecioTotal, LocationID } = req.body;

        // Obtén el carrito correspondiente
        const carritoItem = await Carrito.findOne({
            where: {
                Cedula,
                BikeID,
            },
        });

        if (!carritoItem) {
            return res.status(404).json({ message: 'Item de carrito no encontrado' });
        }
        const newAlquiler = await Alquiler.create({
            Cedula,
            BikeID,
            FechaInicio: carritoItem.get('FechaInicio'), // Accede a la propiedad con .get()
            FechaFin: carritoItem.get('FechaFinalizacion'), // Accede a la propiedad con .get()
            EstadoAlquiler: 'En proceso', // Puedes ajustar el estado según tus necesidades
            MontoTotal: PrecioTotal,
            LocationID,
        });
        await Carrito.destroy({
            where: {
                Cedula,
                BikeID,
            },
        });

        res.status(201).json(newAlquiler);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
