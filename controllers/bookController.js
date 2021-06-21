const Book = require('../models/booksModel')
const Author = require('../models/authorsModel')

const allBook = async (req,res)=>{
    res.send('all books')
}

const newBook_get = async (req,res)=>{
    const book = new Book()
    Author.find()
        .then((result)=>{
            res.render('books/new',{
                book: book,
                authors: result
            })
        })
        .catch(()=>{
            res.redirect('/books')
        })
}

const newBook_post = async (req,res)=>{
    res.send('Create books')
}

module.exports = {
    allBook,
    newBook_get,
    newBook_post
}