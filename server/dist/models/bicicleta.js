"use strict";
// models/Bicicleta.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Ajusta la ruta según tu estructura de archivos
const Bicicleta = connection_1.default.define('Bicicleta', {
    BikeID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Modelo: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    Tipo: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    Estado: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    PrecioPorHora: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
    },
    Descripcion: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    freezeTableName: false
});
exports.default = Bicicleta;
