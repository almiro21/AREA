const { where } = require("sequelize");
const { saveProducts, fetchAllProducts, getProductById, updateProductById, deleteProductById} = require("../../models/Product");
const Product = require("../../models/ProductModel");
const Category = require("../../models/CategoryModel");
const User = require("../../models/UserModel");
const multer = require("multer");


exports.getAddProductPage = (req, res) => {
    Category.findAll({attributes: ['id', 'title']})
    .then((categories) => {
        console.log(categories)
        const viewsdata = {
        edit: false,
        categories,
        pageTitle: 'Add Product'
    };
    res.render('addproduct', viewsdata);
    })
    .catch((error) => {
        console.log(error);
    })
    
};

exports.postAddProductPage = (req, res) => {
    const categoryId = req.body.categoryId;
    
    const imageFile = req.files['image'] ? req.files['image'][0].originalname : null;
    const moddelFile = req.files['model'] ? req.files['model'][0].originalname : null;

    const product = {
        title: req.body.title,
        model: moddelFile,
        Initialprice: req.body.Initialprice,
        price: req.body.price,
        description: req.body.description,
        image: imageFile
    };

    
    
    let categoryObj;

    Category.findByPk(categoryId)
    .then((category) => {
        categoryObj = category;
        return req.user.createProduct(product);
    })
    .then((productObj) => {
        return productObj.setCategory(categoryObj);
    })
    .then(() => {
        res.redirect('/');
    })
    .catch((error) => {
        console.log(error);
    });

};

exports.getAdminProductPage = (req, res) => {
    Product.findAll({include: [{model : Category}, {model : User}]})
    .then((products) => {
        const viewsdata = {
            admin: true,
            pageTitle: 'Admin Products',
            products
        };
        res.render('product-list', viewsdata);
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.getEditProductPage = (req, res) => {
    const productId = req.params.productId;

    let viewsdata = {
        edit: true,  
        pageTitle: 'Edit Product'
    }

    Product.findByPk(productId)
    .then((product) => {
        viewsdata = {...{product}, ...viewsdata};
        return Category.findAll({attributes: ['id', 'title']});
    })
    .then((categories) => {
        viewsdata = {...{categories}, ...viewsdata};
        res.render('addProduct', viewsdata);
    })
    .catch((error) => {
        console.log(error);
    })
  
};

exports.postEditProductPage = (req, res) => {
    const productId = req.body.productId;

    Product.findByPk(productId)
    .then((product) => {
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.imageurl = req.body.image;
        product.categoryId= req.body.categoryId;
        return product.save();
    })
    .then(() => {
        res.redirect('/products');
    })
    .catch((error) => {
        console.log(error);
    })

    //other wat to update

    // const product = {
    //     title:req.body.title,
    //     price: req.body.price,
    //     description: req.body.description,
    //     image: req.body.image
    // };

    // Product.update(product, {where: { id: productId}})
    // .then(() => {
    //     res.redirect('/products');
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
};

exports.postDeleteProductPage = (req, res) => {
    const productId = req.body.productId;

    Product.findByPk(productId)
    .then((product) => {
        return product.destroy()
    })
    .then(()=> {
        res.redirect('/products');
    })
    .catch((error) => {
        console.log(error);
    });

    //other method to delete
//     Product.destroy({where: { id: productId}})
//     .then(() => {
//         res.redirect('/products');
//     })
//     .catch((error) => {
//         console.log(error);
//     });
};