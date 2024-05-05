const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        required: true
    },
    ratingsnumber: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    availablefoods: [],
    carts: [],
    isnew: {
        type: Boolean,
        default: false
    },
    freedrinks: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant