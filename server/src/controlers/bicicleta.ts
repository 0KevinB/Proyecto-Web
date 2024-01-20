// controllers/bicicletaController.ts

import express, { Request, Response } from 'express';
import Bicicleta from '../models/bicicleta';
import PropietarioBicicletas from '../models/propietarioBicicletas';
import path from 'path';
import Bicicleta_Ubicacion from '../models/Bicicleta_Ubicacion';
import Ubicacion from '../models/ubicacion';
import Alquiler from '../models/alquiler';
import { Op } from 'sequelize';
import Carrito from '../models/Carrito';
import Usuario from '../models/usuario';


const app = express();

// Obtener todas las bicicletas
export const obtenerBicicletaPorId = async (req: Request, res: Response) => {
    try {
        const { bikeId } = req.params;
        const bicicleta = await Bicicleta.findByPk(bikeId);

        if (!bicicleta) {
            return res.status(404).json({ error: 'Bicicleta no encontrada' });
        }

        res.status(200).json(bicicleta);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicleta por ID' });
    }
};

export const obtenerBicicletasEnRenta = async (req: Request, res: Response) => {
    try {
        const fechaActual = new Date();

        const bicicletas = await Bicicleta.findAll({
            include: [
                {
                    model: PropietarioBicicletas,
                    attributes: ['imagenReferencia', 'Estado'],
                },
                {
                    model: Alquiler,
                    where: {
                        EstadoAlquiler: 'En renta', // Filtrar por alquileres que están actualmente en curso
                        FechaInicio: {
                            [Op.lte]: fechaActual, // La fecha de inicio debe ser menor o igual a la fecha actual
                        },
                        FechaFin: {
                            [Op.gt]: fechaActual, // La fecha de fin debe ser mayor a la fecha actual
                        },
                    },
                    attributes: ['EstadoAlquiler'],
                },
            ],
            attributes: ['BikeID', 'Modelo', 'Tipo', 'Estado', 'PrecioPorHora', 'Descripcion'],
        });

        res.json(bicicletas);
    } catch (error) {
        console.error('Error al obtener datos de bicicletas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const obtenerBicicletasConImagen = async (req: Request, res: Response) => {
    try {
        const bicicletas = await Bicicleta.findAll({
            include: [
                {
                    model: PropietarioBicicletas,
                    attributes: ['imagenReferencia', 'Estado'],
                },
            ],
            attributes: ['BikeID', 'Modelo', 'Tipo', 'Estado', 'PrecioPorHora', 'Descripcion'],
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
            if (Bicicleta.sequelize) {
                const t = await Bicicleta.sequelize.transaction();
                try {
                    // Elimina la bicicleta de la tabla propietarioBicicleta dentro de la transacción
                    await PropietarioBicicletas.destroy({ where: { BikeID: bicicleta.getDataValue('BikeID') }, transaction: t });
                    await Bicicleta_Ubicacion.destroy({ where: { BikeID: bicicleta.getDataValue('BikeID') }, transaction: t });
                    await Alquiler.destroy({ where: { BikeID: bicicleta.getDataValue('BikeID') }, transaction: t });
                    await Carrito.destroy({ where: { BikeID: bicicleta.getDataValue('BikeID') }, transaction: t });
                    await bicicleta.destroy({ transaction: t });
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

// Aprobar una bicicleta por su ID
export const aprobarBicicleta = async (req: Request, res: Response) => {
    console.log(req.params);
    const { productId } = req.params;
    if (!productId) {
        return res.status(400).json({ error: 'ID de bicicleta no proporcionada' });
    }
    try {
        const bicicleta = await PropietarioBicicletas.findOne({ where: { BikeID: productId } });
        if (bicicleta) {
            // Verificar que PropietarioBicicletas.sequelize no sea undefined antes de usarlo
            if (PropietarioBicicletas.sequelize) {
                // Inicia una transacción manualmente
                const t = await PropietarioBicicletas.sequelize.transaction();
                try {
                    // Actualiza el estado de la bicicleta dentro de la transacción
                    await PropietarioBicicletas.update({ Estado: true }, { where: { BikeID: productId }, transaction: t });
                    // Hace commit de la transacción si todo fue exitoso
                    await t.commit();

                    res.status(200).json({ mensaje: 'Bicicleta aprobada exitosamente.' });
                } catch (error) {
                    // En caso de error, realiza un rollback de la transacción
                    await t.rollback();
                    res.status(500).json({ error: 'Error al aprobar bicicleta' });
                }
            } else {
                res.status(500).json({ error: 'Error al obtener sequelize de PropietarioBicicletas' });
            }
        } else {
            res.status(404).json({ mensaje: 'Bicicleta no encontrada' });
        }
    } catch (error) {
        console.error('Error al aprobar la bicicleta:', error);
        res.status(500).json({ error: 'Error al aprobar la bicicleta' });
    }
};

export const agregarBicicletaAUsuario = async (req: Request, res: Response) => {
    const { Cedula } = req.params;
    const { Modelo, Tipo, Estado, PrecioPorHora, Descripcion } = req.body;
    // Obtener información del usuario
    const usuario = await Usuario.findOne({ where: { Cedula } });

    if (!usuario) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

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

        const nuevoEstado = usuario.getDataValue('RolID') === 2 ? true : false;


        // Asociar la bicicleta al usuario a través de la tabla intermedia
        await PropietarioBicicletas.create({
            Cedula,
            BikeID: bikeID,
            imagenReferencia: req.file ? req.file.filename : null,
            Estado: nuevoEstado
        });

        res.status(201).json(nuevaBicicleta);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al agregar bicicleta al usuario' });
    }
};

export const agregarUbicacionABicicleta = async (req: Request, res: Response) => {
    const { BikeID } = req.params;

    const { NombreUbicacion, Latitud, Longitud, Direccion } = req.body;

    console.log(BikeID, NombreUbicacion, Latitud, Longitud, Direccion);
    try {
        // Crear la ubicación
        const nuevaUbicacion = await Ubicacion.create({
            NombreUbicacion,
            Latitud,
            Longitud,
            Direccion,
        });

        // Obtener el ID de la ubicación
        const ubicacionID = nuevaUbicacion.get('LocationID');

        // Asociar la ubicación a la bicicleta a través de la tabla intermedia
        await Bicicleta_Ubicacion.create({
            BikeID,
            LocationID: ubicacionID,
        });

        res.status(201).json(nuevaUbicacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al agregar ubicación a la bicicleta' });
    }
};


export let verImagen = async (req: Request, res: Response) => {
    let ruta = path.join(__dirname, '../../img/productos', req.params.img);
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
