// models/PropietarioBicicletas.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // Ajusta la ruta según tu estructura de archivos
import Usuario from './usuario';
import Bicicleta from './bicicleta';

const PropietarioBicicletas = sequelize.define('PropietarioBicicletas', {
    OwnerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Cedula: {
        type: DataTypes.STRING(20),
    },
    BikeID: {
        type: DataTypes.INTEGER,
    }, imagenReferencia: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        timestamps: false, freezeTableName: true
    });

PropietarioBicicletas.belongsTo(Usuario, { foreignKey: 'Cedula' });
Usuario.hasMany(PropietarioBicicletas, { foreignKey: 'Cedula' });

PropietarioBicicletas.belongsTo(Bicicleta, { foreignKey: 'BikeID' });
Bicicleta.hasMany(PropietarioBicicletas, { foreignKey: 'BikeID' });

export default PropietarioBicicletas;
