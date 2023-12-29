// controllers/bicicletaController.ts

import express, { Request, Response } from 'express';
import Bicicleta from '../models/bicicleta';
import PropietarioBicicletas from '../models/propietarioBicicletas';
import path from 'path';


const app = express();

// Obtener todas las bicicletas
export const obtenerBicicletas = async (req: Request, res: Response) => {
    try {
        const bicicletas = await Bicicleta.findAll();
        res.status(200).json(bicicletas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicletas' });
    }
};

export const obtenerBicicletasConImagen = async (req: Request, res: Response) => {
    try {
        const bicicletas = await Bicicleta.findAll({
            include: [
                {
                    model: PropietarioBicicletas,
                    attributes: ['imagenReferencia'],
                },
            ],
            attributes: ['BikeID','Modelo', 'Tipo', 'Estado', 'PrecioPorHora', 'Descripcion'],
        });

        res.json(bicicletas);
    } catch (error) {
        console.error('Error al obtener datos de bicicletas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
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
            // Verificar que Bicicleta.sequelize no sea undefined antes de usarlo
            if (Bicicleta.sequelize) {
                // Inicia una transacción manualmente
                const t = await Bicicleta.sequelize.transaction();

                try {
                    // Elimina la bicicleta de la tabla propietarioBicicleta dentro de la transacción
                    await PropietarioBicicletas.destroy({ where: { BikeID: bicicleta.getDataValue('BikeID') }, transaction: t });

                    // Luego, elimina la bicicleta de la tabla Bicicleta
                    await bicicleta.destroy({ transaction: t });

                    // Hace commit de la transacción si todo fue exitoso
                    await t.commit();

                    res.status(204).send();
                } catch (error) {
                    // En caso de error, realiza un rollback de la transacción
                    await t.rollback();
                    res.status(500).json({ error: 'Error al eliminar bicicleta' });
                }
            } else {
                res.status(500).json({ error: 'Error al obtener sequelize de Bicicleta' });
            }
        } else {
            res.status(404).json({ mensaje: 'Bicicleta no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar bicicleta' });
    }
};

export const agregarBicicletaAUsuario = async (req: Request, res: Response) => {
    const { Cedula } = req.params;
    const { Modelo, Tipo, Estado, PrecioPorHora, Descripcion } = req.body;

    try {
        // Crear la bicicleta
        const nuevaBicicleta = await Bicicleta.create({
            Modelo,
            Tipo,
            Estado,
            PrecioPorHora,
            Descripcion,
            imagenReferencia: req.file ? req.file.filename : null,
        });

        // Obtener el ID de la bicicleta
        const bikeID = nuevaBicicleta.get('BikeID');

        // Asociar la bicicleta al usuario a través de la tabla intermedia
        await PropietarioBicicletas.create({
            Cedula,
            BikeID: bikeID,
            imagenReferencia: req.file ? req.file.filename : null,
        });

        res.status(201).json(nuevaBicicleta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al agregar bicicleta al usuario' });
    }
};

export let verImagen = async (req: Request, res: Response) => {
    let ruta = path.join(__dirname, '../img/productos', req.params.img);
    return res.sendFile(ruta);
};

// Obtener bicicletas de un usuario
export const obtenerBicicletasDeUsuario = async (req: Request, res: Response) => {
    const { Cedula } = req.params;

    try {
        const bicicletas = await PropietarioBicicletas.findAll({
            where: { Cedula },
            include: Bicicleta, // Incluir información de la bicicleta
        });

        res.status(200).json(bicicletas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener bicicletas del usuario' });
    }
};
