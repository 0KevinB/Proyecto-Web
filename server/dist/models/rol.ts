// models/Rol.ts
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const Rol = sequelize.define('rol', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: DataTypes.STRING(20),
        unique: true,
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

