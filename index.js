import express from 'express'
import * as mongoose from 'mongoose'
import Client from './client.model.js'

const app = express()
app.use(express.json())
const PORT = 3000

const names = ['Anna', 'Bob', 'Cece', 'Dylan', 'Ernest', 'Fiona', 'Gideon']
const cities = ['Bangkok', 'Paris', 'London', 'Dubai', 'Singapore', 'Kuala Lumpur', 'New York']

const createRandomClientData = () => {
    const name = names[Math.floor(Math.random() * names.length)]
    const age = Math.floor(Math.random() * 60)
    const city = cities[Math.floor(Math.random() * names.length)]
    const client = {
        'name': name,
        'age': age,
        'city': city
    }
    return client
}

const createAndSaveRandomClientData = async () => {
    const randomClientData = createRandomClientData()
    const client = new Client(randomClientData)
    await client.save()
    return client
}

app.get('/', (req, res) => {
    res.status(200)
    res.send("Welcome to the Mongo Workshop")
})

app.get('/client/random', (req, res) => {
    res.status(200).json(createRandomClientData())
})

app.get('/client/random2', async (req, res) => {
    res.status(200).json(await createAndSaveRandomClientData())
})

app.post('/client/notrandom', async (req, res) => {
    console.log(req.body)
    const client = new Client(req.body)
    await client.save()
    res.send()
})

app.get('/client/all', async (req, res) => {
    res.status(200).json(await Client.find().lean())
})

app.get('/client/name/:name', async (req, res) => {
    res.json(await Client.find({ name: req.params.name }).lean())
})

app.put('/client/name/:_id', async (req, res) => {
    await Client.updateOne({ _id: req.params._id }, req.body)
    res.send()
})

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
