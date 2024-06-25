const fs = require('fs');
const path = require('path');
const roothDir = require('../util/path');
const db = require('../util/database');
const { error } = require('console');
const { deleteProductFromCart } = require('./cart');

const getProductsFromFile = (callBack) => {
    const productPath = path.join(roothDir, 'data', 'products.json');
    fs.readFile(productPath, (error, productsData) => {
        if(error){
            return callBack([]);
        }

        return callBack(JSON.parse(productsData));
    });
};

exports.saveProducts = (product) => {
    return db.execute(`insert into products (title, imageurl, description, price) values(?,?,?,?)`, [product.title, product.imageurl, product.description, product.price]);
};

exports.fetchAllProducts = () => {
    return db.execute(`Select * from products`);
};

exports.getProductById = (productId) => {
    return db.execute(`select * from products where id = ?`, [productId]);
};

exports.updateProductById = (product, productId) => {
    const productPath = path.join(roothDir, 'data', 'products.json');
    getProductsFromFile(products => {
        const existingProductIndex = products.findIndex(prod => prod.id.toString() === productId);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = product;
        fs.writeFile(productPath, JSON.stringify(updatedProducts), error => {
            console.log(error);
        });
    });
};

exports.deleteProductById = (productId, callBack) => {
    const productPath = path.join(roothDir, 'data', 'products.json');
    getProductsFromFile(products => {
        let updatedProducts = products.filter(product => product.id.toString() !== productId.toString() );
        deleteProductFromCart(productId);

        fs.writeFile(productPath, JSON.stringify(updatedProducts), error => {
            console.log(error);
        });
        callBack();
    });
};
