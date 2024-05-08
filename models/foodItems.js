const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tagUrl: {
    type: String,
    required: true,
  }
});

const foodItems = mongoose.model('foodItem', foodItemSchema);

module.exports = foodItems;