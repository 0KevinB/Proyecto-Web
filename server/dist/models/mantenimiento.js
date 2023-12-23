"use strict";
// models/Mantenimiento.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Ajusta la ruta según tu estructura de archivos
const bicicleta_1 = __importDefault(require("./bicicleta"));
const Mantenimiento = connection_1.default.define('Mantenimiento', {
    MaintenanceID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    BikeID: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    DescripcionMantenimiento: {
        type: sequelize_1.DataTypes.TEXT,
    },
    FechaInicioMantenimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    FechaFinMantenimiento: {
        type: sequelize_1.DataTypes.DATE,
    },
    CostoMantenimiento: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
    },
    EstadoMantenimiento: {
        type: sequelize_1.DataTypes.STRING(50),
    },
}, {
    timestamps: false, freezeTableName: true
});
Mantenimiento.belongsTo(bicicleta_1.default, { foreignKey: 'BikeID' });
bicicleta_1.default.hasMany(Mantenimiento, { foreignKey: 'BikeID' });
exports.default = Mantenimiento;
