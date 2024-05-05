const express = require('express');
const { getAllRestaurants, getRestaurantByID, addRestaurant } = require('../controllers/restaurants')
const router = express.Router()

router.get('/restaurants', getAllRestaurants)
router.get('/restaurants/:id', getRestaurantByID)
router.post('/addrestaurant', addRestaurant)

module.exports = router;