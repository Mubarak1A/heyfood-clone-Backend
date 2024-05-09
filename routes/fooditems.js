const express = require('express');
const { createFoodItem, getAllFoods, getFoodById, deleteFoodItem } = require('../controllers/fooditems')
const router = express.Router()

router.post('/createFood', createFoodItem)
router.get('/getFoods', getAllFoods)
router.get('/getFood/:id', getFoodById)
router.post('/deleteFood/:id',deleteFoodItem)

module.exports = router;