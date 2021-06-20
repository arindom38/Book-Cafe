const mongoose = require('mongoose')
//creating schema
const Schema = mongoose.Schema
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pubishDate: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        required: true
    },
    coverImageName: {
        type: String,
        required: true
    },
    auhtod: {
        type: mongoose.Schema.Types.ObjectId, // existing monggose model
        required: true,
        ref: 'Author' //referencing author model
    }
},{timestamps: true})

module.exports = mongoose.model('Book',bookSchema)