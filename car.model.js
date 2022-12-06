const mongoose = require('mongoose')
const { OwnerSchema } = require('./owner.model')

const CarSchema = new mongoose.Schema({
    model: String,
    licensePlate: String,
    age: Number,
    doors: Number,
    color: String,
    owner: OwnerSchema,
})

module.exports = mongoose.model('cars', CarSchema)
