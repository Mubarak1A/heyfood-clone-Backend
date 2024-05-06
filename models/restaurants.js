const mongoose = require('mongoose');

// Schema for individual food item with name, image, and price
const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  availableFoods: {
    type: [foodItemSchema],
    default: [],
  },
  isNew: {
    type: Boolean,
    default: false,
  },
  freeDrinks: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;