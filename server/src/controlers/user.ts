import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import { Usuario } from "../models/users";
import jwt from 'jsonwebtoken';


export const newUser = async (req: Request, res: Response) => {

    const { Cedula, Nombre, Apellido, CorreoElectronico, Contraseña, Direccion, Telefono }
        = req.body;

    const user = await Usuario.findOne({ where: { cedula: Cedula } })
    if (user) {
        return res.status(400).json({ message: "Usuario ya registrado" })
    }

    const hashedPass = await bcrypt.hash(Contraseña, 10)
    try {
        await Usuario.create({
            Cedula: Cedula,
            Nombre: Nombre,
            Apellido: Apellido,
            CorreoElectronico: CorreoElectronico,
            Contraseña: hashedPass,
            Direccion: Direccion,
            Telefono: Telefono
        })
        res.json({
            msg: "Usuario creado exitosamente"
        })
    } catch (err) {
        res.status(404).json({ msg: "Ocurrio un error" });
    }

}

export const login = async (req: Request, res: Response) => {
    const { CorreoElectronico, Contraseña } = req.body;

    // Validar en la base de datos
    const user: any = await Usuario.findOne({ where: { CorreoElectronico: CorreoElectronico } })

    if (!user) {
        return res.status(400).json({ msg: "Usuario no registrado" });
    }
    // Validamos password
    const passwordValid = await bcrypt.compare(Contraseña, user.Contraseña)
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecta`
        })
    }
    // Generamos token
    const token = jwt.sign({
        CorreoElectronico: CorreoElectronico
    }, process.env.SECRET_KEY || '123');

    res.json(token);
}