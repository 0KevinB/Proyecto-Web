"use strict";
// models/Ubicacion.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Ajusta la ruta según tu estructura de archivos
const bicicleta_1 = __importDefault(require("./bicicleta"));
const Ubicacion = connection_1.default.define('Ubicacion', {
    LocationID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NombreUbicacion: {
        type: sequelize_1.DataTypes.STRING(255),
    },
    Latitud: {
        type: sequelize_1.DataTypes.DECIMAL(10, 6),
    },
    Longitud: {
        type: sequelize_1.DataTypes.DECIMAL(10, 6),
    },
    Direccion: {
        type: sequelize_1.DataTypes.STRING(255),
    }
}, {
    timestamps: false,
    freezeTableName: true
});
Ubicacion.belongsToMany(bicicleta_1.default, {
    through: 'Bicicleta_Ubicacion', // Nombre de la tabla intermedia
    foreignKey: 'LocationID',
});
bicicleta_1.default.belongsToMany(Ubicacion, {
    through: 'Bicicleta_Ubicacion', // Nombre de la tabla intermedia
    foreignKey: 'BikeID',
});
exports.default = Ubicacion;
