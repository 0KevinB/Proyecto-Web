"use strict";
// models/Alquiler.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Ajusta la ruta según tu estructura de archivos
const usuario_1 = __importDefault(require("./usuario"));
const bicicleta_1 = __importDefault(require("./bicicleta"));
const ubicacion_1 = __importDefault(require("./ubicacion"));
const Alquiler = connection_1.default.define('Alquiler', {
    RentalID: {
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
    FechaInicio: {
        type: sequelize_1.DataTypes.DATE,
    },
    FechaFin: {
        type: sequelize_1.DataTypes.DATE,
    },
    EstadoAlquiler: {
        type: sequelize_1.DataTypes.STRING(50),
    },
    MontoTotal: {
        type: sequelize_1.DataTypes.DECIMAL(8, 2),
    },
    LocationID: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    timestamps: false, freezeTableName: true
});
Alquiler.belongsTo(usuario_1.default, { foreignKey: 'Cedula' });
usuario_1.default.hasMany(Alquiler, { foreignKey: 'Cedula' });
Alquiler.belongsTo(bicicleta_1.default, { foreignKey: 'BikeID' });
bicicleta_1.default.hasMany(Alquiler, { foreignKey: 'BikeID' });
Alquiler.belongsTo(ubicacion_1.default, { foreignKey: 'LocationID' });
ubicacion_1.default.hasMany(Alquiler, { foreignKey: 'LocationID' });
exports.default = Alquiler;
