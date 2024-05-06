const express = require('express');
const { addToCart, getItemById, removeItem, getItems } = require('../controllers/cart')
const router = express.Router()

router.post('/addToCart', addToCart)
router.post('/getItem', getItemById)
router.post('/removeItem', removeItem)
router.get('/getItems', getItems)

module.exports = router;