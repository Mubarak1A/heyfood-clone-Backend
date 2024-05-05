const { generateToken } = require('../helpers/tokens')
const { validateEmail, validateLength, validateUsername } = require('../helpers/validation')
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
            phoneNumber: user.phoneNumber
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message : "This email address is not registered"})
        }
        const check = await bcrypt.compare(password, user.password)
        if(!check){
            res.status(400).json({message : "Invalid password. Please try again."})
        }

        const token = generateToken({id : user._id.toString()}, "7d")
        res.send({
            id: user._id,
            username: user.username,
            picture: user.picture,
            first_name: user.first_name,
            last_name: user.last_name,
            token: token,
            verify: user.verify,
            message: 'Registration Successful! Please activate your email to start'
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}