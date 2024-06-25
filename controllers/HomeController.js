const { where } = require("sequelize");
const {fetchAllProducts, getProductById } = require("../models/Product");
const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const User = require("../models/UserModel");

exports.getHomePage = (req, res) =>{

    Product.findAll({include: [{model : Category}, {model : User}]})
    .then((products) => {
        console.log(products);
        const viewsdata = {
            admin: false,
            products,
            pageTitle: 'Home page'
        };
        res.render('product-list', viewsdata);
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.getProductDetailPage = (req, res) => {
    const productId = req.params.productId;

    Product.findAll({include: [{model : Category}, {model : User}]}, {where: {id: productId}})
    .then((product) => {
        const viewsdata = {
            product: product[0],
            pageTitle: product[0].title
        };
        res.render('ProductDetail', viewsdata);
    })
    .catch((error) => {
        console.log(error);
    });
};

  