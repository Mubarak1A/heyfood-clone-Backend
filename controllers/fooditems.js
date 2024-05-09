const { FoodItem } = require('../models/fooditems'); // Reference the FoodItem model

const router = express.Router();

// Middleware to parse request bodies
router.use(express.json());

// Create a new food item
const createFoodItem = async (req, res) => {
  try {
    const { name, tagUrl } = req.body;

    if (!name || !tagUrl) {
      return res.status(400).json({ message: 'Name and Tag URL are required.' });
    }

    const newFoodItem = new FoodItem({ name, tagUrl });
    await newFoodItem.save();

    res.status(201).json({ message: 'Food item created successfully.', newFoodItem });
  } catch (error) {
    res.status(500).json({ message: 'Error creating food item.', error });
  }
};

// Get all food items
const getAllFoods = async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food items.', error });
  }
};

// Get a specific food item by ID
const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodItem = await FoodItem.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    res.status(200).json(foodItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food item.', error });
  }
};

// Delete a specific food item by ID
const deleteFoodItem = async (req, res) => {
  try {
    const { id } = req.params;

    const foodItem = await FoodItem.findByIdAndDelete(id);

    if (!foodItem) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    res.status(200).json({ message: 'Food item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting food item.', error });
  }
};

module.exports = {
    createFoodItem,
    getAllFoods,
    getFoodById,
    deleteFoodItem
};
