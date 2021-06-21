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
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: req.body.publishDate,
        pageCount: req.body.pageCount,
        description: req.body.description
    })
}

module.exports = {
    allBook,
    newBook_get,
    newBook_post
}