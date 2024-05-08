const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tagUrl: {
    type: String,
    required: true,
  },
});

const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = {
  FoodItem,
  foodItemSchema,
};
