const Book = require('../models/booksModel')
const Author = require('../models/authorsModel')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']



const allBook = async (req, res) => {
    //custom query for mongoDB
    let query = {}
    if (req.query.title != null && req.query.title !== '') {
        //regex used serach for both upper and lower case . i indicate case insensitive
        //query.function(model_propname, req.quer.proper)
        query.title = new RegExp(req.query.title, 'i')
    }
    if (req.query.author != null && req.query.author !== '') {
        try {
            query.author = await Author.find({name:new RegExp(req.query.author, 'i')}).exec()
        } catch (error) {
            console.log(error)
        }
    }
    if (req.query.publishbefore != null && req.query.publishbefore != '') {
        query.publishDate = { '$lte': req.query.publishbefore } // lte is <= operator for mongodb
    }
    if (req.query.publishafter != null && req.query.publishafter != '') {
        query.publishDate = { '$gte': req.query.publishafter }// gte is => operator mongodb
    }
    await Book.find(query) //pass the custom query
        .then((result) => {
            res.render('books/index', {
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
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: Number(req.body.pageCount),
        description: req.body.description
    })
    saveCover(book, req.body.cover)

    await book.save()
        .then((result) => {
            res.redirect(`books/${result.id}`)
        })
        .catch((err) => {
            console.log(req.file)
            renderNewPage(res, book, true)

        })
}

const showBook_get = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author').exec()
        res.render('books/show', { book: book })
    } catch (error) {
        res.redirect('/')
    }
}


const editBook_get = async (req, res) => {
    await Book.findById(req.params.id)
        .then((result) => {
            renderEditPage(res, result, false)
        })
        .catch(err => {
            res.redirect(`/books/${req.params.id}`)
        })
}

const updateBook_put = async (req, res) => {
    await Book.findById(req.params.id)
        .then((result) => {
            result.title = req.body.title
            result.author = req.body.author
            result.pageCount = Number(req.body.pageCount)
            result.description = req.body.description
            result.publishDate = new Date(req.body.publishDate)

            if (req.body.cover != null && req.body.cover != '') {
                saveCover(book, req.body.cover)
            }
            result.save()
                .then((resultsave) => {
                    res.redirect(`/books/${resultsave.id}`)
                })
                .catch((err) => {
                    console.log(err)
                    renderEditPage(res, book, true)
                })
        })
        .catch(err => {
            res.redirect('/')
        })
}

const dltBook_delete = async (req, res) => {
    await Book.findById(req.params.id)
        .then((resultfind) => {
            resultfind.remove()
                .then((result) => {
                    res.redirect('/books')
                })
                .catch((err) => {
                    res.redirect(`/books/${resultfind.id}`)
                })
        })
        .catch((err) => { //when author is not found
            res.redirect('/') //redirect to home page
        })
}

async function renderNewPage(res, book, hasError = false) {
    renderFormPage(res, book, 'new', hasError)
}

async function renderEditPage(res, book, hasError = false) {
    renderFormPage(res, book, 'edit', hasError)
}

async function renderFormPage(res, book, form, hasError = false) {
    await Author.find().sort({name: 1})
        .then((result) => {
            const params = {
                authors: result,
                book: book
            }
            if (hasError) {
                if (form === 'edit') {
                    params.errorMssg = "Error in Editing Book"
                } else {
                    params.errorMssg = "Error in Creating Book"
                }
            }
            res.render(`books/${form}`, params)
        })
        .catch(err => {
            res.redirect('/books')
        })
}

function saveCover(book, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
}

module.exports = {
    allBook,
    newBook_get,
    newBook_post,
    showBook_get,
    editBook_get,
    updateBook_put,
    dltBook_delete
}