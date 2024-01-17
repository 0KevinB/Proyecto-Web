"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importa el controlador
const alquiler_1 = require("../controlers/alquiler");
// Importa Router de express
const express_1 = require("express");
const router = (0, express_1.Router)();
// Ruta para obtener el estado de alquiler por cédula
router.get('/alquiler/:cedula', alquiler_1.getAlquilerByCedula);
exports.default = router;
