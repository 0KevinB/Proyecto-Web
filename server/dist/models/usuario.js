"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/users.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const rol_1 = require("./rol");
const Usuario = connection_1.default.define('Usuario', {
    Cedula: {
        type: sequelize_1.DataTypes.STRING(20),
        primaryKey: true,
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    Apellido: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    CorreoElectronico: {
        type: sequelize_1.DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    Contraseña: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    Direccion: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    Telefono: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false
    },
    Estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    RolID: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    }
}, {
    timestamps: true,
    freezeTableName: false
});
Usuario.belongsTo(rol_1.Rol, { foreignKey: 'RolID' });
rol_1.Rol.hasMany(Usuario, { foreignKey: 'RolID' });
exports.default = Usuario;
