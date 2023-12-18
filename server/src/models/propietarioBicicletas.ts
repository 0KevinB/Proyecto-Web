// models/PropietarioBicicletas.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // Ajusta la ruta según tu estructura de archivos
import Usuario from './users';
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
    },
},
    {
        timestamps: false,
    });

PropietarioBicicletas.belongsTo(Usuario, { foreignKey: 'Cedula' });
Usuario.hasMany(PropietarioBicicletas, { foreignKey: 'Cedula' });

PropietarioBicicletas.belongsTo(Bicicleta, { foreignKey: 'BikeID' });
Bicicleta.hasMany(PropietarioBicicletas, { foreignKey: 'BikeID' });

export default PropietarioBicicletas;
