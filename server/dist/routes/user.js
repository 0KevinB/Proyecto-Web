"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controlers/usuario");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post('/', usuario_1.newUser);
router.post('/login', usuario_1.login);
router.post('/forgotPassword', usuario_1.forgotPassword);
router.post('/resetPassword', usuario_1.resetPassword);
router.get('/getUserDetails/:Cedula', validate_token_1.default, usuario_1.getUserDetails);
router.put('/update/:Cedula', validate_token_1.default, usuario_1.updateUserInfo);
exports.default = router;
