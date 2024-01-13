import express, { Request, Response } from 'express';
import Ubicacion from '../models/ubicacion';


const app = express();

export const obtenerUbicacion = async (req: Request, res: Response) => {
    try {
        const Ubicaciones = await Ubicacion.findAll();
        res.status(200).json(Ubicaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicleta ubicacion' });
    }
};
