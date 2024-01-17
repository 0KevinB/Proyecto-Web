// models/Ubicacion.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';
import Bicicleta from './bicicleta';

const Ubicacion = sequelize.define('Ubicacion', {
    LocationID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    NombreUbicacion: {
        type: DataTypes.STRING(255),
    },
    Latitud: {
        type: DataTypes.DECIMAL(10, 6),
    },
    Longitud: {
        type: DataTypes.DECIMAL(10, 6),
    },
    Direccion: {
        type: DataTypes.STRING(255),
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Ubicacion.belongsToMany(Bicicleta, {
    through: 'Bicicleta_Ubicacion',
    foreignKey: 'LocationID',
});

Bicicleta.belongsToMany(Ubicacion, {
    through: 'Bicicleta_Ubicacion',
    foreignKey: 'BikeID',
});

export default Ubicacion;
