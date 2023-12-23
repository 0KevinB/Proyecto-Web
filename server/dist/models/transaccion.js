"use strict";
// models/Transaccion.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Ajusta la ruta según tu estructura de archivos
const usuario_1 = __importDefault(require("./usuario"));
const alquiler_1 = __importDefault(require("./alquiler"));
const Transaccion = connection_1.default.define('Transaccion', {
    TransactionID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Cedula: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    RentalID: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    Monto: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
    },
    MetodoPago: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    FechaTransaccion: {
        type: sequelize_1.DataTypes.DATE,
    }
}, {
    timestamps: false, freezeTableName: true
});
Transaccion.belongsTo(usuario_1.default, { foreignKey: 'Cedula' });
usuario_1.default.hasMany(Transaccion, { foreignKey: 'Cedula' });
Transaccion.belongsTo(alquiler_1.default, { foreignKey: 'RentalID' });
alquiler_1.default.hasMany(Transaccion, { foreignKey: 'RentalID' });
exports.default = Transaccion;
