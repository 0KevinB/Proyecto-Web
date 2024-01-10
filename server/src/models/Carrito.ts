// models/Carrito.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import Usuario from './usuario';
import Bicicleta from './bicicleta';

const Carrito = sequelize.define('Carrito', {
    CarritoID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Cedula: {
        type: DataTypes.STRING(20),
    },
    BikeID: {
        type: DataTypes.INTEGER,
    },
    HorasSeleccionadas: {
        type: DataTypes.INTEGER,
    },
    FechaInicio: {
        type: DataTypes.DATE,
    },
    FechaFinalizacion: {
        type: DataTypes.DATE,
    },
    PrecioTotal: {
        type: DataTypes.DECIMAL(8, 2),
    }
},
    {
        timestamps: false, freezeTableName: true
    });

Carrito.belongsTo(Usuario, { foreignKey: 'Cedula' });
Usuario.hasMany(Carrito, { foreignKey: 'Cedula' });

Carrito.belongsTo(Bicicleta, { foreignKey: 'BikeID' });
Bicicleta.hasMany(Carrito, { foreignKey: 'BikeID' });

export default Carrito;
