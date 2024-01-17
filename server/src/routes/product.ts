import { Router } from 'express';
import validateToken from './validate-token';
import multer from 'multer';

import {
    obtenerBicicletaPorId,
    crearBicicleta,
    actualizarBicicleta,
    eliminarBicicleta,
    agregarBicicletaAUsuario,
    obtenerBicicletasDeUsuario,
    verImagen,
    obtenerBicicletasConImagen,
    aprobarBicicleta,
    agregarUbicacionABicicleta,
    obtenerBicicletasEnRenta,
} from '../controlers/bicicleta';

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img/productos');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});


const upload = multer({ storage: storage });


const router = Router();

// Obtener todas las bicicletas
router.get('/bicicletas/:bikeId', validateToken, obtenerBicicletaPorId);

router.get('/bikes', validateToken, obtenerBicicletasConImagen);

router.get('/rentadas', validateToken, obtenerBicicletasEnRenta);

// Crear una nueva bicicleta
router.post('/', validateToken, crearBicicleta);

// Actualizar una bicicleta por su ID
router.put('/:BikeID', validateToken, actualizarBicicleta);

// Eliminar una bicicleta por su ID
router.delete('/:BikeID', validateToken, eliminarBicicleta);

// Agregar bicicleta a un usuario
router.post('/:Cedula/assign-bike', validateToken, upload.single('imagenReferencia'), agregarBicicletaAUsuario);
router.post('/:BikeID/assign-ubicacion', validateToken, agregarUbicacionABicicleta);

router.get('/bikes/imagen/:img', verImagen);


// Aprobar bicicletas
router.put('/approve/:productId', aprobarBicicleta);


// Obtener bicicletas de un usuario
router.get('/:Cedula/bicicletas', validateToken, obtenerBicicletasDeUsuario);

export default router;
