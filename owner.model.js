const mongoose = require('mongoose')

const OwnerSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

module.exports = {
    Owner: mongoose.model('owners', OwnerSchema),
    OwnerSchema: OwnerSchema,
}
