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
exports.realizarAlquiler = void 0;
const Carrito_1 = __importDefault(require("../models/Carrito"));
const alquiler_1 = __importDefault(require("../models/alquiler"));
const realizarAlquiler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extrae los datos necesarios del cuerpo de la solicitud
        const { Cedula, BikeID, HorasSeleccionadas, PrecioTotal, LocationID } = req.body;
        // Obtén el carrito correspondiente
        const carritoItem = yield Carrito_1.default.findOne({
            where: {
                Cedula,
                BikeID,
            },
        });
        if (!carritoItem) {
            return res.status(404).json({ message: 'Item de carrito no encontrado' });
        }
        const newAlquiler = yield alquiler_1.default.create({
            Cedula,
            BikeID,
            FechaInicio: carritoItem.get('FechaInicio'),
            FechaFin: carritoItem.get('FechaFinalizacion'),
            EstadoAlquiler: 'En proceso',
            MontoTotal: PrecioTotal,
            LocationID,
        });
        yield Carrito_1.default.destroy({
            where: {
                Cedula,
                BikeID,
            },
        });
        res.status(201).json(newAlquiler);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.realizarAlquiler = realizarAlquiler;
