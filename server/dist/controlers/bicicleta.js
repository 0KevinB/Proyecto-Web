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
exports.eliminarBicicleta = exports.actualizarBicicleta = exports.obtenerBicicletaPorID = exports.crearBicicleta = exports.obtenerBicicletas = void 0;
const bicicleta_1 = __importDefault(require("../models/bicicleta"));
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
// Obtener una bicicleta por su ID
const obtenerBicicletaPorID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { BikeID } = req.params;
    try {
        const bicicleta = yield bicicleta_1.default.findByPk(BikeID);
        if (bicicleta) {
            res.status(200).json(bicicleta);
        }
        else {
            res.status(404).json({ mensaje: 'Bicicleta no encontrada' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicleta' });
    }
});
exports.obtenerBicicletaPorID = obtenerBicicletaPorID;
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
            yield bicicleta.destroy();
            res.status(204).send();
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
