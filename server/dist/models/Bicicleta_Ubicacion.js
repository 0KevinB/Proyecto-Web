"use strict";
// models/Bicicleta_Ubicacion.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection")); // Ajusta la ruta según tu estructura de archivos
const ubicacion_1 = __importDefault(require("./ubicacion")); // Asegúrate de tener el modelo Ubicacion importado
const bicicleta_1 = __importDefault(require("./bicicleta")); // Asegúrate de tener el modelo Bicicleta importado
const Bicicleta_Ubicacion = connection_1.default.define('Bicicleta_Ubicacion', {
    Bicicleta_UbicacionID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    LocationID: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    BikeID: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    timestamps: false,
    freezeTableName: true,
});
Bicicleta_Ubicacion.belongsTo(ubicacion_1.default, { foreignKey: 'LocationID' });
ubicacion_1.default.belongsToMany(bicicleta_1.default, {
    through: Bicicleta_Ubicacion,
    foreignKey: 'LocationID',
});
Bicicleta_Ubicacion.belongsTo(bicicleta_1.default, { foreignKey: 'BikeID' });
bicicleta_1.default.belongsToMany(ubicacion_1.default, {
    through: Bicicleta_Ubicacion,
    foreignKey: 'BikeID',
});
exports.default = Bicicleta_Ubicacion;
