import {Sequelize} from "sequelize";


const sequelize = new Sequelize('proyecto-web', 'root', '1234',{
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize