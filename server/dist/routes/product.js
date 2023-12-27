"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate-token"));
const bicicleta_1 = require("../controlers/bicicleta");
const router = (0, express_1.Router)();
// Obtener todas las bicicletas
router.get('/', validate_token_1.default, bicicleta_1.obtenerBicicletas);
// Crear una nueva bicicleta
router.post('/', validate_token_1.default, bicicleta_1.crearBicicleta);
// Obtener una bicicleta por su ID
router.get('/:BikeID', validate_token_1.default, bicicleta_1.obtenerBicicletaPorID);
// Actualizar una bicicleta por su ID
router.put('/:BikeID', validate_token_1.default, bicicleta_1.actualizarBicicleta);
// Eliminar una bicicleta por su ID
router.delete('/:BikeID', validate_token_1.default, bicicleta_1.eliminarBicicleta);
exports.default = router;
