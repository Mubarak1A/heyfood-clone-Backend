const express = require('express');
const { addToCart, getItemsById, removeItem, getItems } = require('../controllers/cart')
const router = express.Router()

router.post('/addToCart', addToCart)
router.get('/getItems/:userId', getItemsById)
router.post('/removeItem', removeItem)
router.get('/getItems', getItems)

module.exports = router;