// models/Bicicleta.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // Ajusta la ruta según tu estructura de archivos
import Ubicacion from './ubicacion';

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
    LocationID: {
        type: DataTypes.INTEGER,
    }
},
    {
        timestamps: false,
    });

Bicicleta.belongsTo(Ubicacion, { foreignKey: 'LocationID' });
Ubicacion.hasMany(Bicicleta, { foreignKey: 'LocationID' });

export default Bicicleta;
