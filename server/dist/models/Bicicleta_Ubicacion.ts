// models/Bicicleta_Ubicacion.ts

import { DataTypes } from 'sequelize';
import sequelize from '../db/connection'; // Ajusta la ruta según tu estructura de archivos
import Ubicacion from './ubicacion'; // Asegúrate de tener el modelo Ubicacion importado
import Bicicleta from './bicicleta'; // Asegúrate de tener el modelo Bicicleta importado

const Bicicleta_Ubicacion = sequelize.define(
    'Bicicleta_Ubicacion',
    {
        Bicicleta_UbicacionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        LocationID: {
            type: DataTypes.INTEGER,
        },
        BikeID: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

Bicicleta_Ubicacion.belongsTo(Ubicacion, { foreignKey: 'LocationID' });
Ubicacion.belongsToMany(Bicicleta, {
    through: Bicicleta_Ubicacion,
    foreignKey: 'LocationID',
});

Bicicleta_Ubicacion.belongsTo(Bicicleta, { foreignKey: 'BikeID' });
Bicicleta.belongsToMany(Ubicacion, {
    through: Bicicleta_Ubicacion,
    foreignKey: 'BikeID',
});

export default Bicicleta_Ubicacion;
