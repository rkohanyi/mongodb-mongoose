const express = require('express')
const mongoose = require('mongoose')
const Car = require('./car.model.js')

const app = express()
app.use(express.json())
const PORT = 3000

app.get('/cars', async (req, res) => {
    const cars = await Car.find()
    res.json(cars)
})

app.get('/cars/by-model', async (req, res) => {
    const cars = await Car.find({model: {$regex : req.query.model}})
    res.json(cars)
})

app.get('/cars/:id', async (req, res) => {
    const car = await Car.findOne({_id: req.params.id})
    car.model = 'Merci'
    await car.save()
    res.json(car)
})

async function main() {
    try {
        const dbName = 'test'
        console.log(`Connecting to DB: ${dbName}`)
        const result = await mongoose.connect(`mongodb://127.0.0.1/${dbName}`, {
            serverSelectionTimeoutMS: 1000,
        })
        console.log(`Connected to DB: ${result.connection.name}`)

        app.listen(PORT, (error) => {
            if (!error)
                console.log(`Server is running at http://localhost:${PORT}`)
            else
                console.error("Error occured, server can't start", error)
        })
    } catch (error) {
        console.error('Error, cannot connect to DB', error)
    }
}

main()
