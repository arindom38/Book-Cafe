const mongoose = require('mongoose')
const path = require('path')

const coverImageBasepath = 'uploads/bookcovers'

//creating schema
const Schema = mongoose.Schema
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    createdDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    pageCount: {
        type: Number,
        required: true
    },
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // existing monggose model
        required: true,
        ref: 'Author' //referencing author model
    }
},{timestamps: true})


bookSchema.virtual('coverImagePath').get(function() {
    if (this.coverImageName != null) {
      return path.join('/', coverImageBasePath, this.coverImageName)
    }
  })

  
module.exports = mongoose.model('Book',bookSchema)
//import the module as a name not as a object
module.exports.coverImageBasepath  = coverImageBasepath 