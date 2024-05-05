const User = require('../models/user')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    try {
        const {
            name,
            phoneNumber,
            pin
        } = req.body

        const crypt_pin = await bcrypt.hash(pin, 12)

        const user = await new User({
            name,
            phoneNumber,
            pin : crypt_pin
        }).save()

        res.send({
            id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.login = async (req, res) => {
    try {
        const { phoneNumber, pin} = req.body
        const user = await User.findOne({phoneNumber})

        if(!user){
            res.status(400).json({message : "This phone number is not registered"})
        }

        const check = await bcrypt.compare(pin, user.pin)

        if(!check){
            res.status(400).json({message : "Incorrect Pin. Please try again."})
        }

        res.send({
            id: user._id,
            name: user.name,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}