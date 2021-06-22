const Book = require('../models/booksModel')
const Author = require('../models/authorsModel')
const fs = require('fs')



const allBook = async (req, res) => {
    //custom query for mongoDB
    let query = {}
    if(req.query.title != null && req.query.title !== ''){
        //regex used serach for both upper and lower case . i indicate case insensitive
        //query.function(model_propname, req.quer.proper)
        query.title = new RegExp(req.query.title,'i')
    }
    if(req.query.publishbefore != null && req.query.publishbefore != ''){
        query.publishDate = {'$lte': req.query.publishbefore } // lte is <= operator for mongodb
    }
    if(req.query.publishafter != null && req.query.publishafter != ''){
        query.publishDate  = {'$gte': req.query.publishafter }// gte is => operator mongodb
    }
    await Book.find(query) //pass the custom query
        .then((result) => {
            res.render('books/index',{
                books: result,
                searchToken: req.query
            })
        })
        .catch(err => {
            res.redirect('/')
        })
}

const newBook_get = async (req, res) => {
    //passing new book cause we want to create one after filling the form
    renderNewPage(res, new Book())
}

const newBook_post = async (req, res) => {
    const filename = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: Number(req.body.pageCount),
        coverImageName: filename,
        description: req.body.description
    })
    await book.save()
        .then((result) => {
            //res.redirect(`books/${newBook:id}`)
            res.redirect('/books')
        })
        .catch((err) => {
            console.log(req.file)
            if (book.coverImageName != null) {
                removeCoverPage(req.file.path)
            }
            //if any error occur in creating it will pass the existing book
            renderNewPage(res, book, true)

        })
}

async function removeCoverPage(filepath) {
    fs.unlink(filepath, err => {
        if (err) console.log(err)
    })
}

async function renderNewPage(res, book, hasError = false) {
    await Author.find()
        .then((result) => {
            const params = {
                authors: result,
                book: book
            }
            if (hasError) params.errorMssg = "Error in Creating Book"
            res.render('books/new', params)
        })
        .catch(err => {
            res.redirect('/books')
        })
}

module.exports = {
    allBook,
    newBook_get,
    newBook_post
}