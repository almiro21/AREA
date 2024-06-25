const { Sequelize } = require("sequelize");


const sequelize = new Sequelize('AREA', 'root', '', {
    dialect:'mysql',
    host: 'localhost'
});

module.exports = sequelize;

