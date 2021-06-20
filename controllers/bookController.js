const Book = require('../models/booksModel')

const allBook = async (req,res)=>{
    res.send('all books')
}

const newBook_get = async (req,res)=>{
    res.send('new books')
}

const newBook_post = async (req,res)=>{
    res.send('Create books')
}

module.exports = {
    allBook,
    newBook_get,
    newBook_post
}