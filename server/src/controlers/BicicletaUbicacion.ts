import express, { Request, Response } from 'express';
import Bicicleta_Ubicacion from '../models/Bicicleta_Ubicacion';


const app = express();

export const obtenerBicicletaUbicacion = async (req: Request, res: Response) => {
    try {
        const Bicicleta_Ubicacionicion = await Bicicleta_Ubicacion.findAll();
        res.status(200).json(Bicicleta_Ubicacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicleta ubicacion' });
    }
};
