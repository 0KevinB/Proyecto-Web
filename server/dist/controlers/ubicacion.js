"use strict";
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
exports.actualizarUbicacion = exports.obtenerUbicacionPorBicicletaId = exports.obtenerUbicacion = void 0;
const express_1 = __importDefault(require("express"));
const ubicacion_1 = __importDefault(require("../models/ubicacion"));
const Bicicleta_Ubicacion_1 = __importDefault(require("../models/Bicicleta_Ubicacion"));
const app = (0, express_1.default)();
const obtenerUbicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ubicaciones = yield Bicicleta_Ubicacion_1.default.findAll({
            include: [{
                    model: ubicacion_1.default,
                    attributes: ['LocationID', 'NombreUbicacion', 'Latitud', 'Longitud', 'Direccion'],
                }],
        });
        // Obtén solo las ubicaciones de la relación
        const ubicacionesFiltradas = ubicaciones.map((ubicacionBicicleta) => ubicacionBicicleta.Ubicacion);
        res.status(200).json(ubicacionesFiltradas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener bicicleta ubicacion' });
    }
});
exports.obtenerUbicacion = obtenerUbicacion;
const obtenerUbicacionPorBicicletaId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bikeId } = req.params; // Supongo que el BikeID está en los parámetros de la solicitud
        const ubicaciones = yield Bicicleta_Ubicacion_1.default.findAll({
            where: { BikeID: bikeId },
            include: [{
                    model: ubicacion_1.default,
                    attributes: ['LocationID', 'NombreUbicacion', 'Latitud', 'Longitud', 'Direccion'],
                }],
        });
        // Obtén solo las ubicaciones de la relación
        const ubicacionesFiltradas = ubicaciones.map((ubicacionBicicleta) => ubicacionBicicleta.Ubicacion);
        res.status(200).json(ubicacionesFiltradas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener bicicleta ubicacion' });
    }
});
exports.obtenerUbicacionPorBicicletaId = obtenerUbicacionPorBicicletaId;
const actualizarUbicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ubicacionId } = req.params;
        const { NombreUbicacion, Direccion } = req.body;
        const ubicacion = yield ubicacion_1.default.findByPk(ubicacionId);
        if (!ubicacion) {
            return res.status(404).json({ error: 'Ubicación no encontrada' });
        }
        // Actualiza la ubicación con los nuevos datos
        yield ubicacion.update({
            NombreUbicacion,
            Direccion,
            // Otros campos que puedas tener en la ubicación
        });
        res.status(200).json({ mensaje: 'Ubicación actualizada correctamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar ubicación' });
    }
});
exports.actualizarUbicacion = actualizarUbicacion;
