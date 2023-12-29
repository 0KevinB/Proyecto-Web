// models/Alquiler.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // Ajusta la ruta según tu estructura de archivos
import Usuario from './usuario';
import Bicicleta from './bicicleta';
import Ubicacion from './ubicacion';

const Alquiler = sequelize.define('Alquiler', {
    RentalID: {
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
    FechaInicio: {
        type: DataTypes.DATE,
    },
    FechaFin: {
        type: DataTypes.DATE,
    },
    EstadoAlquiler: {
        type: DataTypes.STRING(50),
    },
    MontoTotal: {
        type: DataTypes.DECIMAL(8, 2),
    },
    LocationID: {
        type: DataTypes.INTEGER,
    }
},
{
    timestamps: false, freezeTableName: true
});

Alquiler.belongsTo(Usuario, { foreignKey: 'Cedula' });
Usuario.hasMany(Alquiler, { foreignKey: 'Cedula' });

Alquiler.belongsTo(Bicicleta, { foreignKey: 'BikeID' });
Bicicleta.hasMany(Alquiler, { foreignKey: 'BikeID' });

Alquiler.belongsTo(Ubicacion, { foreignKey: 'LocationID' });
Ubicacion.hasMany(Alquiler, { foreignKey: 'LocationID' });

export default Alquiler;
