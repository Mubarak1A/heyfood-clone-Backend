const Cart = require('../models/cart');
const mongoose = require('mongoose');

// Add item to the cart
const addToCart = async (req, res) => {
    try {
        const { userId, restaurantId, foodName, quantity, price } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(
            item => item.restaurantId.toString() === restaurantId.toString() && item.foodName === foodName
        );

        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].price = price;
        } else {
            const newItem = { restaurantId, foodName, quantity, price };
            cart.items.push(newItem);
        }

        await cart.save();

        res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get cart items for a specific user by user ID
const getItemsById = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const cart = await Cart.findOne({ userId }).populate('items.restaurantId', 'name'); 

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for user' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Remove a specific item from the cart
const removeItem = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ message: 'Invalid item ID' });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const updatedItems = cart.items.filter(item => item._id.toString() !== itemId);

        cart.items = updatedItems;

        await cart.save();

        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all carts (for admin/analytics purposes)
const getItems = async (req, res) => {
    try {
        const carts = await Cart.find().populate('userId', 'name').populate('items.restaurantId', 'name');
        res.status(200).json(carts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addToCart,
    getItemsById,
    removeItem,
    getItems
};
