"use strict";
// models/Carrito.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const usuario_1 = __importDefault(require("./usuario"));
const bicicleta_1 = __importDefault(require("./bicicleta"));
const Carrito = connection_1.default.define('Carrito', {
    CarritoID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Cedula: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    BikeID: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    HorasSeleccionadas: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    FechaInicio: {
        type: sequelize_1.DataTypes.DATE,
    },
    FechaFinalizacion: {
        type: sequelize_1.DataTypes.DATE,
    },
    PrecioTotal: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
    }
}, {
    timestamps: false, freezeTableName: true
});
Carrito.belongsTo(usuario_1.default, { foreignKey: 'Cedula' });
usuario_1.default.hasMany(Carrito, { foreignKey: 'Cedula' });
Carrito.belongsTo(bicicleta_1.default, { foreignKey: 'BikeID' });
bicicleta_1.default.hasMany(Carrito, { foreignKey: 'BikeID' });
exports.default = Carrito;
