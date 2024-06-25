const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    Initialprice:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    price:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    }

}, {tableName: 'products'});

module.exports = Product;