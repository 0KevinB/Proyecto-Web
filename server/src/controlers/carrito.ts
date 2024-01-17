import Carrito from '../models/Carrito';
import Usuario from '../models/usuario';
import Bicicleta from '../models/bicicleta';
import { Request, Response } from 'express';
import Alquiler from '../models/alquiler';
import Bicicleta_Ubicacion from '../models/Bicicleta_Ubicacion';

// Obtener todos los elementos del carrito de un usuario
export const getCarritoByUsuario = async (req: Request, res: Response) => {
    try {
        const cedula = req.params.cedula; // asumiendo que la cedula está en los parámetros de la URL
        const carrito = await Carrito.findAll({
            where: { Cedula: cedula },
            include: [Usuario, Bicicleta],
        });
        res.json(carrito);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Agregar un producto al carrito y crear un registro de alquiler simultáneamente

export const addToCarrito = async (req: Request, res: Response) => {
    try {
        const { Cedula, Producto, CantidadHoras, PrecioTotal } = req.body;
        const { BikeID } = Producto;

        // Calcular la fecha actual
        const fechaInicio = new Date();

        // Calcular la fecha final como la fecha actual más las horas seleccionadas
        const fechaFinalizacion = new Date(fechaInicio);
        fechaFinalizacion.setMinutes(fechaFinalizacion.getMinutes() + CantidadHoras);

        // Obtener la LocationID de la tabla intermedia Bicicleta_Ubicacion
        const ubicacionBicicleta = await Bicicleta_Ubicacion.findOne({
            where: { BikeID: BikeID },
        });

        if (!ubicacionBicicleta) {
            return res.status(404).json({ message: 'Ubicación de bicicleta no encontrada' });
        }

        const { LocationID } = ubicacionBicicleta.toJSON(); // Extraer la LocationID del resultado

        // Crear un nuevo registro en la tabla Carrito
        const newCartItem = await Carrito.create({
            Cedula: Cedula,
            BikeID: BikeID,
            HorasSeleccionadas: CantidadHoras,
            FechaInicio: fechaInicio,
            FechaFinalizacion: fechaFinalizacion,
            PrecioTotal: PrecioTotal,
        });

        // Crear un nuevo registro en la tabla Alquiler
        const newRental = await Alquiler.create({
            Cedula: Cedula,
            BikeID: BikeID,
            FechaInicio: fechaInicio,
            FechaFin: fechaFinalizacion,
            EstadoAlquiler: 'En renta',
            MontoTotal: PrecioTotal,
            LocationID: LocationID,
        });

        // Configurar la verificación automática después de la fecha de finalización
        const rentalId = (newRental as any).RentalID;
        const tiempoDeEspera = (newRental as any).FechaFin.getTime() - new Date().getTime();
        console.log('Datos a enviar para actualizar: ', rentalId, tiempoDeEspera)
        setTimeout(() => {
            actualizarEstadoBicicleta(rentalId);
        }, tiempoDeEspera);

        res.status(201).json({ alquiler: newRental });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


// Función para cambiar el estado de la bicicleta automáticamente
const actualizarEstadoBicicleta = async (rentalId: number) => {
    try {
        const rental = await Alquiler.findByPk(rentalId);

        // Verifica si la fecha actual es posterior a la fecha de finalización
        if (rental && new Date() > (rental as any).FechaFin) {
            // Cambia el estado de la bicicleta a "Disponible"
            const rentalId = (rental as any).RentalID;
            await Alquiler.update({ EstadoAlquiler: 'Finalizada' }, { where: { RentalID: rentalId } });
        }
    } catch (error) {
        console.error('Error al actualizar el estado de la bicicleta:', error);
    }
};

export const removeFromCarrito = async (req: Request, res: Response) => {
    try {
        const carritoId = req.params.carritoId;
        const carrito = await Carrito.findByPk(carritoId);

        if (!carrito) {
            return res.status(404).json({ message: 'El producto en el carrito no fue encontrado' });
        }

        await carrito.destroy();
        res.json({ message: 'Producto eliminado del carrito exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};