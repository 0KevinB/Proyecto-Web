import express, { Request, Response } from 'express';
import Ubicacion from '../models/ubicacion';
import Bicicleta_Ubicacion from '../models/Bicicleta_Ubicacion';


const app = express();

export const obtenerUbicacion = async (req: Request, res: Response) => {
    try {
        const ubicaciones: any[] = await Bicicleta_Ubicacion.findAll({
            include: [{
                model: Ubicacion,
                attributes: ['LocationID', 'NombreUbicacion', 'Latitud', 'Longitud', 'Direccion'],
            }],
        });

        // Obtén solo las ubicaciones de la relación
        const ubicacionesFiltradas = ubicaciones.map((ubicacionBicicleta: any) => ubicacionBicicleta.Ubicacion);

        res.status(200).json(ubicacionesFiltradas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener bicicleta ubicacion' });
    }
};

export const obtenerUbicacionPorBicicletaId = async (req: Request, res: Response) => {
    try {
        const { bikeId } = req.params; // Supongo que el BikeID está en los parámetros de la solicitud
        const ubicaciones: any[] = await Bicicleta_Ubicacion.findAll({
            where: { BikeID: bikeId },
            include: [{
                model: Ubicacion,
                attributes: ['LocationID', 'NombreUbicacion', 'Latitud', 'Longitud', 'Direccion'],
            }],
        });

        // Obtén solo las ubicaciones de la relación
        const ubicacionesFiltradas = ubicaciones.map((ubicacionBicicleta: any) => ubicacionBicicleta.Ubicacion);
        res.status(200).json(ubicacionesFiltradas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener bicicleta ubicacion' });
    }
};

export const actualizarUbicacion = async (req: Request, res: Response) => {
    try {
        const { ubicacionId } = req.params;
        const { NombreUbicacion, Direccion } = req.body;
        const ubicacion = await Ubicacion.findByPk(ubicacionId);
        if (!ubicacion) {
            return res.status(404).json({ error: 'Ubicación no encontrada' });
        }
        // Actualiza la ubicación con los nuevos datos
        await ubicacion.update({
            NombreUbicacion,
            Direccion,
            // Otros campos que puedas tener en la ubicación
        });
        res.status(200).json({ mensaje: 'Ubicación actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar ubicación' });
    }
};
