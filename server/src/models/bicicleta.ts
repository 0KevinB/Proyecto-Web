// models/Bicicleta.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // Ajusta la ruta según tu estructura de archivos

const Bicicleta = sequelize.define('Bicicleta', {
    BikeID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Modelo: {
        type: DataTypes.STRING(255),
    },
    Tipo: {
        type: DataTypes.STRING(50),
    },
    Estado: {
        type: DataTypes.STRING(50),
    },
    PrecioPorHora: {
        type: DataTypes.DECIMAL(8, 2),
    },
    Descripcion: {
        type: DataTypes.TEXT,
    },
}, {
    freezeTableName: false
});

export default Bicicleta;
