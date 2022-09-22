import { model, Schema } from 'mongoose'

export default model('Client', new Schema({
    name: String,
    age: Number,
    city: String,
}))
