const Cart = require('../models/cart');
const Restaurant = require('../models/restaurants')

const addToCart = async (req, res) => {
    try {
        const item = new Cart(req.body);

        const cart = await item.save();

        const restaurant = await Restaurant.findOneAndUpdate(
            { _id: cart.restaurantId },
            { $push: { cart: item } },
            { new: true }
        );

        res.status(201).send('Item Added Successfully');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getItemById = async (req, res) => {
    try {
        const userid = req.body.userid;
        const items = await Cart.find({ userid : userid});
        res.send(items);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const removeItem = async (req, res) => {
    try {
        const id = req.body._id

        const item = await Cart.deleteOne({ _id : id })
        res.send("Item removed Successfully!")
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getItems = async (req, res) => {
    try {
        const items = await Cart.find();
        res.send(items);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    addToCart,
    getItemById,
    removeItem,
    getItems
};
