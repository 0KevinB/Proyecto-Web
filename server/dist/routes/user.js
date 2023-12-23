"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../controlers/usuario");
const router = (0, express_1.Router)();
router.post('/', usuario_1.newUser);
router.post('/login', usuario_1.login);
exports.default = router;
