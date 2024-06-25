const express = require('express');
const { getAddProductPage, postAddProductPage, getAdminProductPage, getEditProductPage, postEditProductPage, postDeleteProductPage } = require('../controllers/admin/ProductController.js');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path.js');


const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check the fieldname and store files accordingly
        if (file.fieldname === 'image') {
            cb(null, path.join(rootDir, '/public/images/'));
        } 
        else if(file.fieldname === 'model'){
            cb(null, path.join(rootDir, '/public/images/uploaded_images'));
        }
        else {
            cb(new Error('Invalid field name'));
        }
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });


const upload = multer({
    storage: storage
  });


router.get('/', getAdminProductPage);

router.get('/add', getAddProductPage);

router.post('/add',upload.fields([{ name: "image", maxCount: 1 },{ name: "model", maxCount: 1 },]), postAddProductPage);

router.get('/edit/:productId', getEditProductPage);

router.post('/edit', postEditProductPage);

router.post('/delete', postDeleteProductPage);


// router.get('/users',(req, res, next)=>{
//     const viewsdata = {
//         pageTitle: 'User Page',
//     }
//     res.render('user', viewsdata);
// });

module.exports = router;