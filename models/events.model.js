import { Schema, model } from 'mongoose'

const eventCollection = 'event'
const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

// Para que no se muestre el __v y reemplaze el _id por el id
eventSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

export const EventModel = model(eventCollection, eventSchema)