// controllers/bicicletaController.ts

import { Request, Response } from 'express';
import Bicicleta from '../models/bicicleta';

// Obtener todas las bicicletas
export const obtenerBicicletas = async (req: Request, res: Response) => {
    try {
        const bicicletas = await Bicicleta.findAll();
        res.status(200).json(bicicletas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicletas' });
    }
};

// Crear una nueva bicicleta
export const crearBicicleta = async (req: Request, res: Response) => {
    try {
        const nuevaBicicleta = await Bicicleta.create(req.body);
        res.status(201).json(nuevaBicicleta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear bicicleta' });
    }
};

// Obtener una bicicleta por su ID
export const obtenerBicicletaPorID = async (req: Request, res: Response) => {
    const { BikeID } = req.params;
    try {
        const bicicleta = await Bicicleta.findByPk(BikeID);
        if (bicicleta) {
            res.status(200).json(bicicleta);
        } else {
            res.status(404).json({ mensaje: 'Bicicleta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicleta' });
    }
};

// Actualizar una bicicleta por su ID
export const actualizarBicicleta = async (req: Request, res: Response) => {
    const { BikeID } = req.params;
    try {
        const bicicleta = await Bicicleta.findByPk(BikeID);
        if (bicicleta) {
            await bicicleta.update(req.body);
            res.status(200).json(bicicleta);
        } else {
            res.status(404).json({ mensaje: 'Bicicleta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar bicicleta' });
    }
};

// Eliminar una bicicleta por su ID
export const eliminarBicicleta = async (req: Request, res: Response) => {
    const { BikeID } = req.params;
    try {
        const bicicleta = await Bicicleta.findByPk(BikeID);
        if (bicicleta) {
            await bicicleta.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ mensaje: 'Bicicleta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar bicicleta' });
    }
};
