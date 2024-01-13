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
exports.obtenerBicicletaUbicacion = void 0;
const express_1 = __importDefault(require("express"));
const Bicicleta_Ubicacion_1 = __importDefault(require("../models/Bicicleta_Ubicacion"));
const app = (0, express_1.default)();
const obtenerBicicletaUbicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Bicicleta_Ubicacionicion = yield Bicicleta_Ubicacion_1.default.findAll();
        res.status(200).json(Bicicleta_Ubicacion_1.default);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener bicicleta ubicacion' });
    }
});
exports.obtenerBicicletaUbicacion = obtenerBicicletaUbicacion;
