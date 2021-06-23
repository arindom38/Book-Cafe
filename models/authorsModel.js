const mongoose = require('mongoose')
const Book = require('./booksModel')
//creating schema
const Schema = mongoose.Schema
const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},{timestamps: true})

//constraint before removing author (check associcate books)
authorSchema.pre('remove',function(next){
    // executes, passing results to callback (books)
    Book.find({ author: this.id},(err,books)=>{
        if(err){ //if any db connect error
            next(err)
        }
        else if(books.length > 0){ // if the requested author has books
            next(new Error('This Author has Books still'))
        }
        else{ //else do nothing
            next()
        }
    })
})

//wrap the shcema wiith model object and exports
// (table/collection name, scheman name)
//collection name will be changed into lowercase and plural
module.exports = mongoose.model('Author',authorSchema)