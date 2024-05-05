const Restaurants = require('../models/restaurants');

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurants.find();
        res.send(restaurants);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRestaurantByID = async (req, res) => {
    try {
        const id = req.params.id;
        const restaurant = await Restaurants.findById(id);
        res.send(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const addRestaurant = async (req, res) => {
    try {
        const newRestaurant = new Restaurants(req.body);

        const restaurant = await newRestaurant.save();
        res.status(201).send('Restaurant Added Successfully');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = {
    getAllRestaurants,
    getRestaurantByID,
    addRestaurant,
};
