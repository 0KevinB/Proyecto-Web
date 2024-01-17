// Importa el modelo y módulos necesarios
import { Request, Response } from 'express';
import Alquiler from '../models/alquiler';

// Controlador para obtener el estado de alquiler por cédula
export const getAlquilerByCedula = async (req: Request, res: Response) => {
    try {
        const cedula = req.params.cedula;

        // Buscar el estado de alquiler en la base de datos
        const alquiler = await Alquiler.findAll({
            where: { Cedula: cedula },
        });

        if (!alquiler) {
            return res.status(404).json({ message: 'Alquiler no encontrado para la cédula proporcionada' });
        }

        // Retornar el estado de alquiler
        res.json(alquiler);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getAlquiler = async (req: Request, res: Response) => {
    console.log('Llegaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ', req.params, req.body)
    try {
        const alquiler = await Alquiler.findAll();
        if (!alquiler || alquiler.length === 0) {
            return res.status(404).json({ message: 'Alquiler no encontrado para la cédula proporcionada' });
        }

        // Retornar el estado de alquiler
        res.json(alquiler);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

