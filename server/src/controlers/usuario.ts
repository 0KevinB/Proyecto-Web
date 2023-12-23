import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import Usuario from "../models/usuario";
import jwt from 'jsonwebtoken';

export const newUser = async (req: Request, res: Response) => {
    const { Cedula, Nombre, Apellido, CorreoElectronico, Contraseña, Direccion, Telefono } = req.body;

    try {
        const existingUser = await Usuario.findOne({ where: { CorreoElectronico: CorreoElectronico } });

        if (existingUser) {
            return res.status(400).json({ message: "Usuario ya registrado" });
        }

        const hashedPass = await bcrypt.hash(Contraseña, 10);

        await Usuario.create({
            Cedula: Cedula,
            Nombre: Nombre,
            Apellido: Apellido,
            CorreoElectronico: CorreoElectronico,
            Contraseña: hashedPass,
            Direccion: Direccion,
            Telefono: Telefono
        });

        res.json({
            msg: "Usuario creado exitosamente"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Ocurrió un error" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { CorreoElectronico, Contraseña } = req.body;

    try {
        const user: any = await Usuario.findOne({ where: { CorreoElectronico: CorreoElectronico } });

        if (!user) {
            return res.status(400).json({ msg: "Usuario no registrado" });
        }

        const passwordValid = await bcrypt.compare(Contraseña, user.Contraseña);

        if (!passwordValid) {
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ CorreoElectronico: CorreoElectronico }, process.env.SECRET_KEY || '123');

        res.json(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al intentar iniciar sesión" });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { CorreoElectronico } = req.body;

    try {
        const user = await Usuario.findOne({ where: { CorreoElectronico: CorreoElectronico } });

        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // Aquí podrías implementar la lógica para enviar un correo electrónico con un enlace para restablecer la contraseña

        res.json({ msg: "Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al procesar la solicitud" });
    }
};

export const updateUserInfo = async (req: Request, res: Response) => {
    const { Cedula } = req.params;
    const { Nombre, Apellido, Direccion, Telefono } = req.body;

    try {
        const user = await Usuario.findByPk(Cedula);

        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        await user.update({ Nombre, Apellido, Direccion, Telefono });

        res.json({ msg: "Información de usuario actualizada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al intentar actualizar la información del usuario" });
    }
};
