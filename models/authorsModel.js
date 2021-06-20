const mongoose = require('mongoose')
//creating schema
const Schema = mongoose.Schema
const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},{timestamps: true})

//wrap the shcema wiith model object and exports
// (table/collection name, scheman name)
//collection name will be changed into lowercase and plural
module.exports = mongoose.model('Author',authorSchema)