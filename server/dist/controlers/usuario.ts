import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import Usuario from "../models/usuario";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

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

        const token = jwt.sign({ CorreoElectronico: CorreoElectronico, Cedula: user.Cedula,}, process.env.SECRET_KEY || '123');

        res.json(token);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al intentar iniciar sesión" });
    }
};

export const forgotPassword = async (req: Request, res: Response) => {
    const { CorreoElectronico } = req.body;
    let transporter: nodemailer.Transporter | undefined;

    if (!CorreoElectronico) {
        return res.status(400).json({ msg: 'CorreoElectronico no proporcionado' });
    }

    try {
        const user = await Usuario.findOne({ where: { CorreoElectronico } });

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Genera un token único y seguro para el enlace de restablecimiento de contraseña
        const resetToken = jwt.sign({ userId: user.get('Cedula') }, process.env.SECRET_KEY || '123', { expiresIn: '1h' });

        // Restablece el campo 'resetToken' en la base de datos para el usuario
        user.setDataValue('resetToken', resetToken);
        await user.save();

        // Configura el transporter para nodemailer (ajusta según tus detalles SMTP)
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.CORREO_ELECTRONICO,
                pass: process.env.PASSWORD,
            },
        });

        // Configura el enlace de restablecimiento de contraseña
        const resetLink = `http://localhost:4200/reset-password?token=${resetToken}`;

        // Configura el correo electrónico
        const mailOptions = {
            from: process.env.CORREO_ELECTRONICO,
            to: CorreoElectronico,
            subject: 'Restablecimiento de Contraseña',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetLink}`,
        };

        // Envía el correo electrónico
        if (transporter) {
            await transporter.sendMail(mailOptions);
        } else {
            throw new Error('Error al configurar el transporter');
        }

        res.json({ msg: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al procesar la solicitud' });
    } finally {
        // Cierra el transporter después de usarlo
        if (transporter) {
            transporter.close();
        }
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;

    try {
        // Verifica la validez del token usando la clave secreta
        const decodedToken: any = jwt.verify(token, process.env.SECRET_KEY || '123');
        const userId: string = decodedToken.userId;

        // Encuentra al usuario en la base de datos por el ID
        const user: any = await Usuario.findByPk(userId);

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Validar que la propiedad Contraseña sea un string
        if (typeof user.Contraseña !== 'string') {
            return res.status(500).json({ msg: 'Error en el formato de la contraseña' });
        }

        // Actualiza la contraseña del usuario en la base de datos
        console.log('Contraseña antes del hash:', user.Contraseña);
        const hashedPass = await bcrypt.hash(newPassword, 10);
        user.Contraseña = hashedPass; // Asegúrate de que Contraseña sea la propiedad correcta
        await user.save();

        res.json({ msg: 'Contraseña restablecida con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al procesar la solicitud' });
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
