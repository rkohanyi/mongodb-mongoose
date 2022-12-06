const express = require('express')
const mongoose = require('mongoose')
const Car = require('./car.model.js')
const { Owner } = require('./owner.model.js')

const colors = [
    'blue',
    'red',
    'green'
]

const app = express()
app.use(express.json())
const PORT = 3000

// READ
app.get('/cars', async (req, res) => {
    const cars = await Car.find()
    res.json(cars)
})

app.get('/owners', async (req, res) => {
    res.json(await Owner.find())
})

// READ
app.get('/cars/by-model', async (req, res) => {
    const cars = await Car.find({ model: { $regex: req.query.model } })
    res.json(cars)
})

// READ
app.get('/cars/:id', async (req, res) => {
    const car = await Car.findOne({ _id: req.params.id })
    res.json(car)
})

// CREATE
app.post('/cars', async (req, res) => {
    try {
        const car = await Car.create(req.body)
        res.json(car)
    } catch (err) {
        res.status(500).json(err)
    }
})

// CREATE
app.post('/cars2', async (req, res) => {
    try {
        const car = new Car(req.body)
        await car.save()
        res.json(car)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE
app.put('/cars/random-color', async (req, res) => {
    console.log('random-color')
    const cars = await Car.find({})
    for (let i = 0; i < cars.length; i++) {
        cars[i].color = colors[i % 3]
        await cars[i].save()
    }
    res.send()
})

// UPDATE
app.put('/cars/:carId/owner/:ownerId', async (req, res) => {
    try {
        const owner = await Owner.findOne({ _id: req.params.ownerId })
        await Car.updateOne({ _id: req.params.carId }, { $push: { owners: [owner] } })
        res.status(200).end()
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE
app.put('/cars/:id', async (req, res) => {
    console.log(':id', req.params.id)
    try {
        await Car.updateOne({ _id: req.params.id }, req.body)
        res.status(200).end()
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE
app.put('/cars/:id/doors', async (req, res) => {
    try {
        await Car.updateOne({ _id: req.params.id }, { $set: { doors: req.body.doors } })
        res.status(200).end()
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE
app.put('/cars/:id/doors2', async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.params.id })
        car.doors = req.body.doors
        await car.save()
        res.status(200).end()
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE
app.delete('/cars', async (req, res) => {
    try {
        await Car.deleteMany({})
        res.status(200).end()
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE
app.delete('/cars/:id', async (req, res) => {
    try {
        await Car.deleteOne({ _id: req.params.id })
        res.status(200).end()
    } catch (err) {
        res.status(500).json(err)
    }
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
