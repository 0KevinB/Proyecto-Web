// Importa el modelo y módulos necesarios
import { Request, Response } from 'express';
import Alquiler from '../models/alquiler';
import Bicicleta from '../models/bicicleta';
import PropietarioBicicletas from '../models/propietarioBicicletas';

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

export const getAlquilerByBikeID = async (req: Request, res: Response) => {
    console.log('Que pasa')
    try {
        const bikeId = req.params.bikeId;
        console.log(req.params)
        const alquiler = await Alquiler.findAll({
            where: { BikeID: bikeId },
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
    try {
        const alquileres = await Alquiler.findAll();

        if (!alquileres || alquileres.length === 0) {
            return res.status(404).json({ message: 'Alquiler no encontrado para la cédula proporcionada' });
        }

        // Calcular la bicicleta más rentable
        let bicicletas: { [BikeID: number]: number } = {};

        alquileres.forEach((alquiler) => {
            const bikeID = alquiler.getDataValue('BikeID');
            const montoTotal = parseFloat(alquiler.getDataValue('MontoTotal'));

            if (bicicletas[bikeID] === undefined) {
                bicicletas[bikeID] = 0;
            }

            bicicletas[bikeID] += montoTotal;
        });

        let bicicletaMasRentable: number | any = null;
        let montoMasAlto = 0;

        for (const bikeID in bicicletas) {
            if (bicicletas.hasOwnProperty(bikeID)) {
                if (bicicletas[bikeID] > montoMasAlto) {
                    montoMasAlto = bicicletas[bikeID];
                    bicicletaMasRentable = parseInt(bikeID, 10);
                }
            }
        }

        // Obtener información detallada de la bicicleta más rentable
        const bicicletaMasRentableInfo = await Bicicleta.findByPk(bicicletaMasRentable);

        // Obtener la imagen de referencia de PropietarioBicicletas
        const propietarioBicicletaInfo = await PropietarioBicicletas.findOne({
            where: { BikeID: bicicletaMasRentable },
        });

        // Retornar la bicicleta más rentable junto con el estado de alquiler y la imagen de referencia
        res.json({
            alquileres: alquileres,
            bicicletaMasRentable: {
                ...(bicicletaMasRentableInfo?.toJSON() || {}),
                imagenReferencia: propietarioBicicletaInfo?.getDataValue('imagenReferencia') || null,
            },
            montoMasAlto: montoMasAlto,
        });
    } catch (err) { }
}