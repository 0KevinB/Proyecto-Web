import { Request, Response } from 'express';
import Bicicleta from '../models/bicicleta';

export const getProducts = async (req: Request, res: Response) => {
    const listProducts = await Bicicleta.findAll();

    res.json(listProducts)
}