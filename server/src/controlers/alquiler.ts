// controllers/alquilerAutomaticoController.ts

import { Request, Response } from 'express';
import Alquiler from '../models/alquiler';
import Bicicleta from '../models/bicicleta';
import Usuario from '../models/usuario';
import Ubicacion from '../models/ubicacion';
/*
export const alquilerAutomatico = async (req: Request, res: Response) => {
    // Obtener datos necesarios desde la solicitud (podrían ser enviados como parámetros o en el cuerpo de la solicitud)
    const { Cedula, BikeID, HorasAlquiler } = req.body;

    try {
        // Obtener información del usuario, bicicleta y ubicación
        const usuario = await Usuario.findByPk(Cedula);
        const bicicleta = await Bicicleta.findByPk(BikeID);
        const ubicacion = await Ubicacion.findByPk(LocationID);

        if (!usuario || !bicicleta || !ubicacion) {
            return res.status(404).json({ mensaje: 'Usuario, bicicleta o ubicación no encontrados' });
        }

        // Calcular fechas y monto total
        const fechaInicio = new Date();
        const fechaFin = new Date();
        fechaFin.setHours(fechaInicio.getHours() + HorasAlquiler);

        const montoTotal = Bicicleta.PrecioPorHora * HorasAlquiler;

        // Crear el registro de alquiler
        const nuevoAlquiler = await Alquiler.create({
            Cedula,
            BikeID,
            FechaInicio: fechaInicio,
            FechaFin: fechaFin,
            EstadoAlquiler: 'Activo', // Puedes ajustar según tus necesidades
            MontoTotal: montoTotal,
            LocationID: ubicacion.LocationID,
        });

        res.status(201).json(nuevoAlquiler);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear alquiler automático' });
    }
};
*/