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
exports.updateUserInfo = exports.forgotPassword = exports.login = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = __importDefault(require("../models/usuario"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        const token = jsonwebtoken_1.default.sign({ CorreoElectronico: CorreoElectronico }, process.env.SECRET_KEY || '123');
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
    try {
        const user = yield usuario_1.default.findOne({ where: { CorreoElectronico: CorreoElectronico } });
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        // Aquí podrías implementar la lógica para enviar un correo electrónico con un enlace para restablecer la contraseña
        res.json({ msg: "Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al procesar la solicitud" });
    }
});
exports.forgotPassword = forgotPassword;
const updateUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Cedula } = req.params;
    const { Nombre, Apellido, Direccion, Telefono } = req.body;
    try {
        const user = yield usuario_1.default.findByPk(Cedula);
        if (!user) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        yield user.update({ Nombre, Apellido, Direccion, Telefono });
        res.json({ msg: "Información de usuario actualizada correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ocurrió un error al intentar actualizar la información del usuario" });
    }
});
exports.updateUserInfo = updateUserInfo;
