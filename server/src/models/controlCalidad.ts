// models/ControlCalidad.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // Ajusta la ruta según tu estructura de archivos
import Bicicleta from './bicicleta';

const ControlCalidad = sequelize.define('ControlCalidad', {
    QualityControlID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    BikeID: {
        type: DataTypes.INTEGER,
    },
    FechaRevision: {
        type: DataTypes.DATE,
    },
    Observaciones: {
        type: DataTypes.TEXT,
    },
    EstadoCalidad: {
        type: DataTypes.STRING(50),
    },
},
    {
        timestamps: false, freezeTableName: true
    });

ControlCalidad.belongsTo(Bicicleta, { foreignKey: 'BikeID' });
export default ControlCalidad;
