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
exports.removeFromCarrito = exports.addToCarrito = exports.getCarritoByUsuario = void 0;
const Carrito_1 = __importDefault(require("../models/Carrito"));
const usuario_1 = __importDefault(require("../models/usuario"));
const bicicleta_1 = __importDefault(require("../models/bicicleta"));
const alquiler_1 = __importDefault(require("../models/alquiler"));
const Bicicleta_Ubicacion_1 = __importDefault(require("../models/Bicicleta_Ubicacion"));
// Obtener todos los elementos del carrito de un usuario
const getCarritoByUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cedula = req.params.cedula; // asumiendo que la cedula está en los parámetros de la URL
        const carrito = yield Carrito_1.default.findAll({
            where: { Cedula: cedula },
            include: [usuario_1.default, bicicleta_1.default],
        });
        res.json(carrito);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.getCarritoByUsuario = getCarritoByUsuario;
// Agregar un producto al carrito y crear un registro de alquiler simultáneamente
const addToCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Cedula, Producto, CantidadHoras, PrecioTotal } = req.body;
        const { BikeID } = Producto;
        // Calcular la fecha actual
        const fechaInicio = new Date();
        // Calcular la fecha final como la fecha actual más las horas seleccionadas
        const fechaFinalizacion = new Date(fechaInicio);
        fechaFinalizacion.setMinutes(fechaFinalizacion.getMinutes() + CantidadHoras);
        // Obtener la LocationID de la tabla intermedia Bicicleta_Ubicacion
        const ubicacionBicicleta = yield Bicicleta_Ubicacion_1.default.findOne({
            where: { BikeID: BikeID },
        });
        if (!ubicacionBicicleta) {
            return res.status(404).json({ message: 'Ubicación de bicicleta no encontrada' });
        }
        const { LocationID } = ubicacionBicicleta.toJSON(); // Extraer la LocationID del resultado
        // Crear un nuevo registro en la tabla Carrito
        const newCartItem = yield Carrito_1.default.create({
            Cedula: Cedula,
            BikeID: BikeID,
            HorasSeleccionadas: CantidadHoras,
            FechaInicio: fechaInicio,
            FechaFinalizacion: fechaFinalizacion,
            PrecioTotal: PrecioTotal,
        });
        // Crear un nuevo registro en la tabla Alquiler
        const newRental = yield alquiler_1.default.create({
            Cedula: Cedula,
            BikeID: BikeID,
            FechaInicio: fechaInicio,
            FechaFin: fechaFinalizacion,
            EstadoAlquiler: 'En renta',
            MontoTotal: PrecioTotal,
            LocationID: LocationID,
        });
        // Configurar la verificación automática después de la fecha de finalización
        const rentalId = newRental.RentalID;
        const tiempoDeEspera = newRental.FechaFin.getTime() - new Date().getTime();
        console.log('Datos a enviar para actualizar: ', rentalId, tiempoDeEspera);
        setTimeout(() => {
            actualizarEstadoBicicleta(rentalId);
        }, tiempoDeEspera);
        res.status(201).json({ alquiler: newRental });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.addToCarrito = addToCarrito;
// Función para cambiar el estado de la bicicleta automáticamente
const actualizarEstadoBicicleta = (rentalId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rental = yield alquiler_1.default.findByPk(rentalId);
        // Verifica si la fecha actual es posterior a la fecha de finalización
        if (rental && new Date() > rental.FechaFin) {
            // Cambia el estado de la bicicleta a "Disponible"
            const rentalId = rental.RentalID;
            yield alquiler_1.default.update({ EstadoAlquiler: 'Finalizada' }, { where: { RentalID: rentalId } });
        }
    }
    catch (error) {
        console.error('Error al actualizar el estado de la bicicleta:', error);
    }
});
const removeFromCarrito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carritoId = req.params.carritoId;
        const carrito = yield Carrito_1.default.findByPk(carritoId);
        if (!carrito) {
            return res.status(404).json({ message: 'El producto en el carrito no fue encontrado' });
        }
        yield carrito.destroy();
        res.json({ message: 'Producto eliminado del carrito exitosamente' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});
exports.removeFromCarrito = removeFromCarrito;
