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
exports.obtenerBicicletasDeUsuario = exports.verImagen = exports.agregarBicicletaAUsuario = exports.eliminarBicicleta = exports.actualizarBicicleta = exports.crearBicicleta = exports.obtenerBicicletasConImagen = exports.obtenerBicicletas = void 0;
const express_1 = __importDefault(require("express"));
const bicicleta_1 = __importDefault(require("../models/bicicleta"));
const propietarioBicicletas_1 = __importDefault(require("../models/propietarioBicicletas"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Obtener todas las bicicletas
const obtenerBicicletas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicicletas = yield bicicleta_1.default.findAll();
        res.status(200).json(bicicletas);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicletas' });
    }
});
exports.obtenerBicicletas = obtenerBicicletas;
const obtenerBicicletasConImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bicicletas = yield bicicleta_1.default.findAll({
            include: [
                {
                    model: propietarioBicicletas_1.default,
                    attributes: ['imagenReferencia'],
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
            // Verificar que Bicicleta.sequelize no sea undefined antes de usarlo
            if (bicicleta_1.default.sequelize) {
                // Inicia una transacción manualmente
                const t = yield bicicleta_1.default.sequelize.transaction();
                try {
                    // Elimina la bicicleta de la tabla propietarioBicicleta dentro de la transacción
                    yield propietarioBicicletas_1.default.destroy({ where: { BikeID: bicicleta.getDataValue('BikeID') }, transaction: t });
                    // Luego, elimina la bicicleta de la tabla Bicicleta
                    yield bicicleta.destroy({ transaction: t });
                    // Hace commit de la transacción si todo fue exitoso
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
const agregarBicicletaAUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Cedula } = req.params;
    const { Modelo, Tipo, Estado, PrecioPorHora, Descripcion } = req.body;
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
        // Asociar la bicicleta al usuario a través de la tabla intermedia
        yield propietarioBicicletas_1.default.create({
            Cedula,
            BikeID: bikeID,
            imagenReferencia: req.file ? req.file.filename : null,
        });
        res.status(201).json(nuevaBicicleta);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al agregar bicicleta al usuario' });
    }
});
exports.agregarBicicletaAUsuario = agregarBicicletaAUsuario;
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
