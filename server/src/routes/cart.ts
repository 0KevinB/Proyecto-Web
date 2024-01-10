// En tu archivo de rutas (por ejemplo, routes/cart.ts)
import express, { Request, Response } from 'express';
import Carrito from '../models/Carrito';

const router = express.Router();

// Agregar elemento al carrito
router.post('/agregar', async (req: Request, res: Response) => {
    try {
        const nuevoItem = req.body;
        const carritoItem = await Carrito.create(nuevoItem);
        res.status(201).json(carritoItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al agregar elemento al carrito' });
    }
});

// Obtener elementos del carrito
router.get('/obtener/:cedulaUsuario', async (req: Request, res: Response) => {
    const cedulaUsuario = req.params.cedulaUsuario;
    try {
        const carritoItems = await Carrito.findAll({
            where: {
                Cedula: cedulaUsuario,
            },
        });
        res.json(carritoItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener elementos del carrito' });
    }
});

// Vaciar el carrito
router.delete('/vaciar/:cedulaUsuario', async (req: Request, res: Response) => {
    const cedulaUsuario = req.params.cedulaUsuario;
    try {
        await Carrito.destroy({
            where: {
                Cedula: cedulaUsuario,
            },
        });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al vaciar el carrito' });
    }
});

export default router;
