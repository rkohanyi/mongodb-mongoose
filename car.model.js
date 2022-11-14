const mongoose = require('mongoose')
const { OwnerSchema } = require('./owner.model')

module.exports = mongoose.model('cars', new mongoose.Schema({
    model: String,
    licensePlate: String,
    age: Number,
    doors: Number,
    color: String,
    owners: [OwnerSchema]
}))
