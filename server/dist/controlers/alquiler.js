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
exports.getAlquiler = exports.getAlquilerByCedula = void 0;
const alquiler_1 = __importDefault(require("../models/alquiler"));
// Controlador para obtener el estado de alquiler por cédula
const getAlquilerByCedula = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cedula = req.params.cedula;
        // Buscar el estado de alquiler en la base de datos
        const alquiler = yield alquiler_1.default.findAll({
            where: { Cedula: cedula },
        });
        if (!alquiler) {
            return res.status(404).json({ message: 'Alquiler no encontrado para la cédula proporcionada' });
        }
        // Retornar el estado de alquiler
        res.json(alquiler);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAlquilerByCedula = getAlquilerByCedula;
const getAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Llegaaaaaaaaaaaaaaaaaaaaaaaaaaaaa: ', req.params, req.body);
    try {
        const alquiler = yield alquiler_1.default.findAll();
        if (!alquiler || alquiler.length === 0) {
            return res.status(404).json({ message: 'Alquiler no encontrado para la cédula proporcionada' });
        }
        // Retornar el estado de alquiler
        res.json(alquiler);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getAlquiler = getAlquiler;
