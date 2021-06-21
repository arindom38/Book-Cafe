const Book = require('../models/booksModel')
const Author = require('../models/authorsModel')



const allBook = async (req,res)=>{
    res.send('all books')
}

const newBook_get = async (req,res)=>{
    console.log("New page request")
    const book = new Book()
    Author.find() //fetch all the authors and rendet to new.esj page
        .then((result)=>{
            res.render('books/new',{
                book: book,
                authors: result
            })
        })
        .catch(()=>{
            res.redirect('/books')
        })
    //renderNewPage(res, new Book())
}

const newBook_post = async (req,res)=>{
    //const fileName = req.file != null ? req.file.fileName : null
    console.log(req.file)
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate),
        pageCount: Number(req.body.pageCount),
        coverImageName: fileName,
        description: req.body.description
    })
    console.log(book)
   await book.save()
        .then((result)=>{
             //res.redirect(`books/${newBook:id}`)
             res.redirect('/books')
        })
        .catch((err)=>{
            console.error(err)
            res.send('Fail to save')
           // renderNewPage(res, book, true)
        })
}

async function renderNewPage(res, book, hasError = false) {
    try {
      const authors = await Author.find({})
      const params = {
        authors: authors,
        book: book
      }
      if (hasError) params.errorMessage = 'Error Creating Book'
      res.render('books/new', params)
    } catch {
      res.redirect('/books')
    }
  }

module.exports = {
    allBook,
    newBook_get,
    newBook_post
}