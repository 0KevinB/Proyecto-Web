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
exports.login = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Cedula, Nombre, Apellido, CorreoElectronico, Contraseña, Direccion, Telefono } = req.body;
    const user = yield users_1.Usuario.findOne({ where: { cedula: Cedula } });
    if (user) {
        return res.status(400).json({ message: "Usuario ya registrado" });
    }
    const hashedPass = yield bcrypt_1.default.hash(Contraseña, 10);
    try {
        yield users_1.Usuario.create({
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
        res.status(404).json({ msg: "Ocurrio un error" });
    }
});
exports.newUser = newUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CorreoElectronico, Contraseña } = req.body;
    // Validar en la base de datos
    const user = yield users_1.Usuario.findOne({ where: { CorreoElectronico: CorreoElectronico } });
    if (!user) {
        return res.status(400).json({ msg: "Usuario no registrado" });
    }
    // Validamos password
    const passwordValid = yield bcrypt_1.default.compare(Contraseña, user.Contraseña);
    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecta`
        });
    }
    // Generamos token
    const token = jsonwebtoken_1.default.sign({
        CorreoElectronico: CorreoElectronico
    }, process.env.SECRET_KEY || '123');
    res.json(token);
});
exports.login = login;
