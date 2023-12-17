"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const { DataTypes } = require('sequelize');
const Ubicacion = require('./Ubicacion');
const Bicicleta = connection_1.default.define('Bicicleta', {
    BikeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Modelo: {
        type: DataTypes.STRING(255),
    },
    Tipo: {
        type: DataTypes.STRING(50),
    },
    Estado: {
        type: DataTypes.STRING(50),
    },
    PrecioPorHora: {
        type: DataTypes.DECIMAL(8, 2),
    },
    Descripcion: {
        type: DataTypes.TEXT,
    },
});
Bicicleta.belongsTo(Ubicacion, { foreignKey: 'LocationID' });
Ubicacion.hasMany(Bicicleta, { foreignKey: 'LocationID' });
module.exports = Bicicleta;
