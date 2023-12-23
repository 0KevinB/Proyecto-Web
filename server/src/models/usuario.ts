// models/users.ts
import { DataTypes } from "sequelize";
import sequelize from "../db/connection";
import { Rol } from './rol';
const Usuario = sequelize.define('Usuario', {
    Cedula: {
        type: DataTypes.STRING(20),
        primaryKey: true,
    },
    Nombre: {
        type: DataTypes.STRING(255),
        allowNull: false

    },
    Apellido: {
        type: DataTypes.STRING(255),
        allowNull: false

    },
    CorreoElectronico: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false

    },
    Contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false

    },
    Direccion: {
        type: DataTypes.STRING(255),
        allowNull: false

    },
    Telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    RolID: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
}, {
    timestamps: true,
    freezeTableName: false
});

Usuario.belongsTo(Rol, { foreignKey: 'RolID' });
Rol.hasMany(Usuario, { foreignKey: 'RolID' });
export default Usuario;