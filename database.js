const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const db_Url = process.env.DB_URL;

const database = mongoose.connect(db_Url)
    .then(() => {
        console.log('Database connected successfully!');
    })
    .catch((err) => {
        console.log('Error connecting to db', err)
    })

module.exports = database;