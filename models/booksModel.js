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
    publishDate: {
        type: Date,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: String,
        required: true
    },
    coverImageName: {
        type: String,
        required: true
    },
    auhtor: {
        type: mongoose.Schema.Types.ObjectId, // existing monggose model
        required: true,
        ref: 'Author' //referencing author model
    }
},{timestamps: true})

module.exports = mongoose.model('Book',bookSchema)