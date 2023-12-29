// scripts/crearRoles.js

const { Rol } = require('../models'); // Ajusta la ruta según tu estructura

const rolesData = [
    { ID: 1, Nombre: 'Usuario' },
    { ID: 2, Nombre: 'Administrador' },
    { ID: 3, Nombre: 'Mantenimiento' },
];

const crearRoles = async () => {
    try {
        await Rol.sync();
        await Rol.bulkCreate(rolesData);
        console.log('Roles creados exitosamente');
    } catch (error) {
        console.error('Error al crear roles:', error);
    } finally {
        // Cerrar la conexión a la base de datos (si es necesario)
        // sequelize.close();
    }
};

crearRoles();
