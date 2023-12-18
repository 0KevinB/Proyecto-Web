"use strict";
// models/PropietarioBicicletas.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Ajusta la ruta según tu estructura de archivos
const users_1 = __importDefault(require("./users"));
const bicicleta_1 = __importDefault(require("./bicicleta"));
const PropietarioBicicletas = connection_1.default.define('PropietarioBicicletas', {
    OwnerID: {
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
}, {
    timestamps: false,
});
PropietarioBicicletas.belongsTo(users_1.default, { foreignKey: 'Cedula' });
users_1.default.hasMany(PropietarioBicicletas, { foreignKey: 'Cedula' });
PropietarioBicicletas.belongsTo(bicicleta_1.default, { foreignKey: 'BikeID' });
bicicleta_1.default.hasMany(PropietarioBicicletas, { foreignKey: 'BikeID' });
exports.default = PropietarioBicicletas;
