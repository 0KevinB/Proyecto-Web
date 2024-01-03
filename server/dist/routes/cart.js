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
// En tu archivo de rutas (por ejemplo, routes/cart.ts)
const express_1 = __importDefault(require("express"));
const Carrito_1 = __importDefault(require("../models/Carrito"));
const router = express_1.default.Router();
// Agregar elemento al carrito
router.post('/agregar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevoItem = req.body;
        const carritoItem = yield Carrito_1.default.create(nuevoItem);
        res.status(201).json(carritoItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar elemento al carrito' });
    }
}));
// Obtener elementos del carrito
router.get('/obtener/:cedulaUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cedulaUsuario = req.params.cedulaUsuario;
    try {
        const carritoItems = yield Carrito_1.default.findAll({
            where: {
                Cedula: cedulaUsuario,
            },
        });
        res.json(carritoItems);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener elementos del carrito' });
    }
}));
// Vaciar el carrito
router.delete('/vaciar/:cedulaUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cedulaUsuario = req.params.cedulaUsuario;
    try {
        yield Carrito_1.default.destroy({
            where: {
                Cedula: cedulaUsuario,
            },
        });
        res.status(204).end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al vaciar el carrito' });
    }
}));
exports.default = router;
