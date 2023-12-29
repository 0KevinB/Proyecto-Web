// models/Mantenimiento.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // Ajusta la ruta según tu estructura de archivos
import Bicicleta from './bicicleta';

const Mantenimiento = sequelize.define('Mantenimiento', {
    MaintenanceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    BikeID: {
        type: DataTypes.INTEGER,
    },
    DescripcionMantenimiento: {
        type: DataTypes.TEXT,
    },
    FechaInicioMantenimiento: {
        type: DataTypes.DATE,
    },
    FechaFinMantenimiento: {
        type: DataTypes.DATE,
    },
    CostoMantenimiento: {
        type: DataTypes.DECIMAL(8, 2),
    },
    EstadoMantenimiento: {
        type: DataTypes.STRING(50),
    },
},
    {
        timestamps: false, freezeTableName:true
    });

Mantenimiento.belongsTo(Bicicleta, { foreignKey: 'BikeID' });
Bicicleta.hasMany(Mantenimiento, { foreignKey: 'BikeID' });

export default Mantenimiento;
