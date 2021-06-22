const mongoose = require('mongoose')

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
    coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // existing monggose model
        required: true,
        ref: 'Author' //referencing author model
    }
},{timestamps: true})


//a virtual book model properties which point to the actual image path
// avirtual property is that property which is created from existing property
bookSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
      return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
  })

  
module.exports = mongoose.model('Book',bookSchema)
