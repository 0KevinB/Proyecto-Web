// models/Transaccion.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // Ajusta la ruta según tu estructura de archivos
import Usuario from './usuario';
import Alquiler from './alquiler';

const Transaccion = sequelize.define('Transaccion', {
    TransactionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Cedula: {
        type: DataTypes.STRING(20),
    },
    RentalID: {
        type: DataTypes.INTEGER,
    },
    Monto: {
        type: DataTypes.DECIMAL(8, 2),
    },
    MetodoPago: {
        type: DataTypes.STRING(50),
    },
    FechaTransaccion: {
        type: DataTypes.DATE,
    }
},
    {
        timestamps: false, freezeTableName:true
    });

Transaccion.belongsTo(Usuario, { foreignKey: 'Cedula' });
Usuario.hasMany(Transaccion, { foreignKey: 'Cedula' });

Transaccion.belongsTo(Alquiler, { foreignKey: 'RentalID' });
Alquiler.hasMany(Transaccion, { foreignKey: 'RentalID' });

export default Transaccion;
