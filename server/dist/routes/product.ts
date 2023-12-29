import { Router } from 'express';
import validateToken from './validate-token';
import multer from 'multer';

import {
    obtenerBicicletas,
    crearBicicleta,
    actualizarBicicleta,
    eliminarBicicleta,
    agregarBicicletaAUsuario,
    obtenerBicicletasDeUsuario,
    verImagen,
    obtenerBicicletasConImagen,
} from '../controlers/bicicleta';

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/img/productos');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});


const upload = multer({ storage: storage });


const router = Router();

// Obtener todas las bicicletas
router.get('/', obtenerBicicletas);
router.get('/bikes', obtenerBicicletasConImagen);

// Crear una nueva bicicleta
router.post('/', validateToken, crearBicicleta);

// Actualizar una bicicleta por su ID
router.put('/:BikeID', validateToken, actualizarBicicleta);

// Eliminar una bicicleta por su ID
router.delete('/:BikeID', validateToken, eliminarBicicleta);

// Agregar bicicleta a un usuario
router.post('/:Cedula/assign-bike', validateToken, upload.single('imagenReferencia'), agregarBicicletaAUsuario);

router.get('/bikes/imagen/:img', verImagen);

// Obtener bicicletas de un usuario
router.get('/:Cedula/bicicletas', validateToken, obtenerBicicletasDeUsuario);

export default router;
