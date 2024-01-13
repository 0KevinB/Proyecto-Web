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
exports.getUserDetails = exports.updateUserInfo = exports.resetPassword = exports.forgotPassword = exports.login = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = __importDefault(require("../models/usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Cedula, Nombre, Apellido, CorreoElectronico, Contraseña, Direccion, Telefono } = req.body;
    try {
        const existingUser = yield usuario_1.default.findOne({ where: { CorreoElectronico: CorreoElectronico } });
        if (existingUser) {
            return res.status(400).json({ message: "Usuario ya registrado" });
        }
        const hashedPass = yield bcrypt_1.default.hash(Contraseña, 10);
        yield usuario_1.default.create({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Ocurrió un error" });
    }
});
exports.newUser = newUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CorreoElectronico, Contraseña } = req.body;
    try {
        const user = yield usuario_1.default.findOne({ where: { CorreoElectronico: CorreoElectronico } });
        if (!user) {
            return res.status(400).json({ msg: "Usuario no registrado" });
        }
        const passwordValid = yield bcrypt_1.default.compare(Contraseña, user.Contraseña);
        if (!passwordValid) {
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }
        const token = jsonwebtoken_1.default.sign({ CorreoElectronico: CorreoElectronico, Cedula: user.Cedula, RolID: user.RolID }, process.env.SECRET_KEY || '123');
        res.json(token);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al intentar iniciar sesión" });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CorreoElectronico } = req.body;
    let transporter;
    if (!CorreoElectronico) {
        return res.status(400).json({ msg: 'CorreoElectronico no proporcionado' });
    }
    try {
        const user = yield usuario_1.default.findOne({ where: { CorreoElectronico } });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        // Genera un token único y seguro para el enlace de restablecimiento de contraseña
        const resetToken = jsonwebtoken_1.default.sign({ userId: user.get('Cedula') }, process.env.SECRET_KEY || '123', { expiresIn: '1h' });
        // Restablece el campo 'resetToken' en la base de datos para el usuario
        user.setDataValue('resetToken', resetToken);
        yield user.save();
        // Configura el transporter para nodemailer (ajusta según tus detalles SMTP)
        transporter = nodemailer_1.default.createTransport({
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
            yield transporter.sendMail(mailOptions);
        }
        else {
            throw new Error('Error al configurar el transporter');
        }
        res.json({ msg: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al procesar la solicitud' });
    }
    finally {
        // Cierra el transporter después de usarlo
        if (transporter) {
            transporter.close();
        }
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    try {
        // Verifica la validez del token usando la clave secreta
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || '123');
        const userId = decodedToken.userId;
        // Encuentra al usuario en la base de datos por el ID
        const user = yield usuario_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        // Validar que la propiedad Contraseña sea un string
        if (typeof user.Contraseña !== 'string') {
            return res.status(500).json({ msg: 'Error en el formato de la contraseña' });
        }
        // Actualiza la contraseña del usuario en la base de datos
        console.log('Contraseña antes del hash:', user.Contraseña);
        const hashedPass = yield bcrypt_1.default.hash(newPassword, 10);
        user.Contraseña = hashedPass; // Asegúrate de que Contraseña sea la propiedad correcta
        yield user.save();
        res.json({ msg: 'Contraseña restablecida con éxito' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al procesar la solicitud' });
    }
});
exports.resetPassword = resetPassword;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Cedula } = req.params;
    const { Nombre, Apellido, Direccion, Telefono } = req.body;
    try {
        const user = yield usuario_1.default.findByPk(Cedula);
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        // Utiliza req.body para acceder a los datos del cuerpo de la solicitud
        yield user.update({ Nombre, Apellido, Direccion, Telefono });
        res.json({ msg: "Información de usuario actualizada correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al intentar actualizar la información del usuario" });
    }
});
exports.updateUserInfo = updateUserInfo;
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.Cedula;
        const user = yield usuario_1.default.findByPk(userId, { attributes: ['Cedula', 'Nombre', 'Apellido', 'CorreoElectronico', 'Direccion', 'Telefono'] });
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Ocurrió un error al obtener los detalles del usuario' });
    }
});
exports.getUserDetails = getUserDetails;
