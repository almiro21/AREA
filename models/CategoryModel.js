const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

module.exports=Category;