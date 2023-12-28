"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate-token"));
const multer_1 = __importDefault(require("multer"));
const bicicleta_1 = require("../controlers/bicicleta");
// Configuración de Multer
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src\\img\\productos');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const router = (0, express_1.Router)();
// Obtener todas las bicicletas
router.get('/', validate_token_1.default, bicicleta_1.obtenerBicicletas);
// Crear una nueva bicicleta
router.post('/', validate_token_1.default, bicicleta_1.crearBicicleta);
// Actualizar una bicicleta por su ID
router.put('/:BikeID', validate_token_1.default, bicicleta_1.actualizarBicicleta);
// Eliminar una bicicleta por su ID
router.delete('/:BikeID', validate_token_1.default, bicicleta_1.eliminarBicicleta);
// Nuevas rutas para la asociación con usuarios
// Agregar bicicleta a un usuario
router.post('/:Cedula/assign-bike', validate_token_1.default, upload.single('imagenReferencia'), bicicleta_1.agregarBicicletaAUsuario);
router.get('/bikes', validate_token_1.default, bicicleta_1.obtenerBicicletasConImagen);
router.get('/bikes/imagen/:img', validate_token_1.default, bicicleta_1.verImagen);
// Obtener bicicletas de un usuario
router.get('/:Cedula/bicicletas', validate_token_1.default, bicicleta_1.obtenerBicicletasDeUsuario);
exports.default = router;
