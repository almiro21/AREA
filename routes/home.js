const express = require('express');
const router = express.Router();
const { getHomePage, getProductDetailPage } = require('../controllers/HomeController');
const { getCartPage, postCartPage, deleteCartItem } = require('../controllers/cartController');
const { postOrderPage, getOrderPage } = require('../controllers/OrderController');

router.get('/', getHomePage);
router.get('/product/details/:productId', getProductDetailPage);

router.post('/cart', postCartPage );
router.get('/cart', getCartPage);
router.post('/cart/delete-item', deleteCartItem);
router.post('/order', postOrderPage);
router.get('/order', getOrderPage);

module.exports = router;    