const mongoose = require('mongoose');
const { foodItemSchema } = require('./foodItems');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imgUrl: {
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
