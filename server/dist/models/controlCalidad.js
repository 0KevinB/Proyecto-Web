"use strict";
// models/ControlCalidad.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Ajusta la ruta según tu estructura de archivos
const bicicleta_1 = __importDefault(require("./bicicleta"));
const ControlCalidad = connection_1.default.define('ControlCalidad', {
    QualityControlID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    BikeID: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    FechaRevision: {
        type: sequelize_1.DataTypes.DATE,
    },
    Observaciones: {
        type: sequelize_1.DataTypes.TEXT,
    },
    EstadoCalidad: {
        type: sequelize_1.DataTypes.STRING(50),
    },
}, {
    timestamps: false, freezeTableName: true
});
ControlCalidad.belongsTo(bicicleta_1.default, { foreignKey: 'BikeID' });
exports.default = ControlCalidad;
