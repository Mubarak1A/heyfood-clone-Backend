const express = require('express');
const Cart = require('../models/cart');
const Room = require('../models/roomModels');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.use(express.json());

const addToCart = async (req, res) => {
    try {
        const item = new Cart(req.body);

        const cart = await item.save();
        res.status(201).send('Item Added Successfully');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getItemsById = async (req, res) => {
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
    getItemsById,
    removeItem,
    getItems
};
