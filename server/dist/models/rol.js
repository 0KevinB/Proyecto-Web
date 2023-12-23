"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = void 0;
// models/Rol.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Rol = connection_1.default.define('rol', {
    ID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING(20),
        unique: true,
    }
}, {
    timestamps: false,
    freezeTableName: true
});
