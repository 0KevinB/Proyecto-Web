"use strict";
// controllers/bicicletaController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerBicicletasDeUsuario = exports.verImagen = exports.agregarUbicacionABicicleta = exports.agregarBicicletaAUsuario = exports.aprobarBicicleta = exports.eliminarBicicleta = exports.actualizarBicicleta = exports.crearBicicleta = exports.obtenerBicicletasConImagen = exports.obtenerBicicletasEnRenta = exports.obtenerBicicletaPorId = void 0;
const express_1 = __importDefault(require("express"));
const bicicleta_1 = __importDefault(require("../models/bicicleta"));
const propietarioBicicletas_1 = __importDefault(require("../models/propietarioBicicletas"));
const path_1 = __importDefault(require("path"));
const Bicicleta_Ubicacion_1 = __importDefault(require("../models/Bicicleta_Ubicacion"));
const ubicacion_1 = __importDefault(require("../models/ubicacion"));
const alquiler_1 = __importDefault(require("../models/alquiler"));
const sequelize_1 = require("sequelize");
const Carrito_1 = __importDefault(require("../models/Carrito"));
const usuario_1 = __importDefault(require("../models/usuario"));
const app = (0, express_1.default)();
// Obtener todas las bicicletas
const obtenerBicicletaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bikeId } = req.params;
        const bicicleta = yield bicicleta_1.default.findByPk(bikeId);
        if (!bicicleta) {
            return res.status(404).json({ error: 'Bicicleta no encontrada' });
        }
        res.status(200).json(bicicleta);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicleta por ID' });
    }
});
exports.obtenerBicicletaPorId = obtenerBicicletaPorId;
const obtenerBicicletasEnRenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fechaActual = new Date();
        const bicicletas = yield bicicleta_1.default.findAll({
            include: [
                {
                    model: propietarioBicicletas_1.default,
                    attributes: ['imagenReferencia', 'Estado'],
                },
                {
                    model: alquiler_1.default,
                    where: {
                        EstadoAlquiler: 'En renta', // Filtrar por alquileres que están actualmente en curso
                        FechaInicio: {
                            [sequelize_1.Op.lte]: fechaActual, // La fecha de inicio debe ser menor o igual a la fecha actual
                        },
                        FechaFin: {
                            [sequelize_1.Op.gt]: fechaActual, // La fecha de fin debe ser mayor a la fecha actual
                        },
                    },
                    attributes: ['EstadoAlquiler'],
                },
            ],
            attributes: ['BikeID', 'Modelo', 'Tipo', 'Estado', 'PrecioPorHora', 'Descripcion'],
        });
        res.json(bicicletas);
    }
    catch (error) {
        console.error('Error al obtener datos de bicicletas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.obtenerBicicletasEnRenta = obtenerBicicletasEnRenta;
const obtenerBicicletasConImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicicletas = yield bicicleta_1.default.findAll({
            include: [
                {
                    model: propietarioBicicletas_1.default,
                    attributes: ['imagenReferencia', 'Estado'],
                },
            ],
            attributes: ['BikeID', 'Modelo', 'Tipo', 'Estado', 'PrecioPorHora', 'Descripcion'],
        });
        res.json(bicicletas);
    }
    catch (error) {
        console.error('Error al obtener datos de bicicletas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.obtenerBicicletasConImagen = obtenerBicicletasConImagen;
// Crear una nueva bicicleta
const crearBicicleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevaBicicleta = yield bicicleta_1.default.create(req.body);
        res.status(201).json(nuevaBicicleta);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear bicicleta' });
    }
});
exports.crearBicicleta = crearBicicleta;
// Actualizar una bicicleta por su ID
const actualizarBicicleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { BikeID } = req.params;
    try {
        const bicicleta = yield bicicleta_1.default.findByPk(BikeID);
        if (bicicleta) {
            yield bicicleta.update(req.body);
            res.status(200).json(bicicleta);
        }
        else {
            res.status(404).json({ mensaje: 'Bicicleta no encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar bicicleta' });
    }
});
exports.actualizarBicicleta = actualizarBicicleta;
// Eliminar una bicicleta por su ID
const eliminarBicicleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { BikeID } = req.params;
    try {
        const bicicleta = yield bicicleta_1.default.findByPk(BikeID);
        if (bicicleta) {
            if (bicicleta_1.default.sequelize) {
                const t = yield bicicleta_1.default.sequelize.transaction();
                try {
                    // Elimina la bicicleta de la tabla propietarioBicicleta dentro de la transacción
                    yield propietarioBicicletas_1.default.destroy({ where: { BikeID: bicicleta.getDataValue('BikeID') }, transaction: t });
                    yield Bicicleta_Ubicacion_1.default.destroy({ where: { BikeID: bicicleta.getDataValue('BikeID') }, transaction: t });
                    yield alquiler_1.default.destroy({ where: { BikeID: bicicleta.getDataValue('BikeID') }, transaction: t });
                    yield Carrito_1.default.destroy({ where: { BikeID: bicicleta.getDataValue('BikeID') }, transaction: t });
                    yield bicicleta.destroy({ transaction: t });
                    yield t.commit();
                    res.status(204).send();
                }
                catch (error) {
                    // En caso de error, realiza un rollback de la transacción
                    yield t.rollback();
                    res.status(500).json({ error: 'Error al eliminar bicicleta' });
                }
            }
            else {
                res.status(500).json({ error: 'Error al obtener sequelize de Bicicleta' });
            }
        }
        else {
            res.status(404).json({ mensaje: 'Bicicleta no encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar bicicleta' });
    }
});
exports.eliminarBicicleta = eliminarBicicleta;
// Aprobar una bicicleta por su ID
const aprobarBicicleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const { productId } = req.params;
    if (!productId) {
        return res.status(400).json({ error: 'ID de bicicleta no proporcionada' });
    }
    try {
        const bicicleta = yield propietarioBicicletas_1.default.findOne({ where: { BikeID: productId } });
        if (bicicleta) {
            // Verificar que PropietarioBicicletas.sequelize no sea undefined antes de usarlo
            if (propietarioBicicletas_1.default.sequelize) {
                // Inicia una transacción manualmente
                const t = yield propietarioBicicletas_1.default.sequelize.transaction();
                try {
                    // Actualiza el estado de la bicicleta dentro de la transacción
                    yield propietarioBicicletas_1.default.update({ Estado: true }, { where: { BikeID: productId }, transaction: t });
                    // Hace commit de la transacción si todo fue exitoso
                    yield t.commit();
                    res.status(200).json({ mensaje: 'Bicicleta aprobada exitosamente.' });
                }
                catch (error) {
                    // En caso de error, realiza un rollback de la transacción
                    yield t.rollback();
                    res.status(500).json({ error: 'Error al aprobar bicicleta' });
                }
            }
            else {
                res.status(500).json({ error: 'Error al obtener sequelize de PropietarioBicicletas' });
            }
        }
        else {
            res.status(404).json({ mensaje: 'Bicicleta no encontrada' });
        }
    }
    catch (error) {
        console.error('Error al aprobar la bicicleta:', error);
        res.status(500).json({ error: 'Error al aprobar la bicicleta' });
    }
});
exports.aprobarBicicleta = aprobarBicicleta;
const agregarBicicletaAUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Cedula } = req.params;
    const { Modelo, Tipo, Estado, PrecioPorHora, Descripcion } = req.body;
    // Obtener información del usuario
    const usuario = yield usuario_1.default.findOne({ where: { Cedula } });
    if (!usuario) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
    try {
        // Crear la bicicleta
        const nuevaBicicleta = yield bicicleta_1.default.create({
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
        yield propietarioBicicletas_1.default.create({
            Cedula,
            BikeID: bikeID,
            imagenReferencia: req.file ? req.file.filename : null,
            Estado: nuevoEstado
        });
        res.status(201).json(nuevaBicicleta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al agregar bicicleta al usuario' });
    }
});
exports.agregarBicicletaAUsuario = agregarBicicletaAUsuario;
const agregarUbicacionABicicleta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { BikeID } = req.params;
    const { NombreUbicacion, Latitud, Longitud, Direccion } = req.body;
    console.log(BikeID, NombreUbicacion, Latitud, Longitud, Direccion);
    try {
        // Crear la ubicación
        const nuevaUbicacion = yield ubicacion_1.default.create({
            NombreUbicacion,
            Latitud,
            Longitud,
            Direccion,
        });
        // Obtener el ID de la ubicación
        const ubicacionID = nuevaUbicacion.get('LocationID');
        // Asociar la ubicación a la bicicleta a través de la tabla intermedia
        yield Bicicleta_Ubicacion_1.default.create({
            BikeID,
            LocationID: ubicacionID,
        });
        res.status(201).json(nuevaUbicacion);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al agregar ubicación a la bicicleta' });
    }
});
exports.agregarUbicacionABicicleta = agregarUbicacionABicicleta;
let verImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ruta = path_1.default.join(__dirname, '../../img/productos', req.params.img);
    return res.sendFile(ruta);
});
exports.verImagen = verImagen;
// Obtener bicicletas de un usuario
const obtenerBicicletasDeUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Cedula } = req.params;
    try {
        const bicicletas = yield propietarioBicicletas_1.default.findAll({
            where: { Cedula },
            include: bicicleta_1.default, // Incluir información de la bicicleta
        });
        res.status(200).json(bicicletas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener bicicletas del usuario' });
    }
});
exports.obtenerBicicletasDeUsuario = obtenerBicicletasDeUsuario;
