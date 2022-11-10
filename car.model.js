const mongoose = require('mongoose')

const Owner = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('cars', new mongoose.Schema({
    model: String,
    licensePlate: String,
    age: Number,
    owner: [Owner]
}))
