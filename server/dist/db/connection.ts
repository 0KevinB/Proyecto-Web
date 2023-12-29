import {Sequelize} from "sequelize";


const sequelize = new Sequelize('proyecto-web', 'root', '',{
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize