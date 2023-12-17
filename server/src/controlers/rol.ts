import { Request, Response } from "express";
import { Rol } from "../models/rol";

export const getRoles = async (req: Request, res: Response) => {
    const listRoles = await Rol.findAll();
    res.json({
        msg:"Roles"
    })
}