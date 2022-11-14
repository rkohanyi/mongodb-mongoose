const mongoose = require('mongoose')

const Owner = new mongoose.Schema({
    name: String
})

module.exports = {
    Owner: mongoose.model('owners', Owner),
    OwnerSchema: Owner,
}
