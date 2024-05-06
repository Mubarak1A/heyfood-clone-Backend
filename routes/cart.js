const express = require('express');
const { addToCart, getItemsById, removeItem, getItems } = require('../controllers/cart')
const router = express.Router()

router.post('/addToCart', addToCart)
router.post('/getItem', getItemsById)
router.post('/removeItem', removeItem)
router.get('/getItems', getItems)

module.exports = router;