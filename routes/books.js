const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')
const Book = require('../models/booksModel')

//upload file handler
// const multer = require('multer')
// const path = require('path')
// const uploadPath = path.join('public',Book.coverImageBasepath)
// const imageMimeTypes = ['image/jpeg','image/png','image/gif']
// const upload = multer({
//     dest: uploadPath,
//     fileFilter: (req, file, callback) =>{
//         callback(null,imageMimeTypes.includes(file.mimetype))
//     }
// })

//get all the books
// URl = /books ,method : get
router.get('/',bookController.allBook)

//New book route
// URl = /books/new ,method : get
router.get('/new',bookController.newBook_get)


//Create book
// URl = /books ,method : post
router.post('/',bookController.newBook_post)

//show book route
// URl = /books/:id ,method : get
router.get('/:id',bookController.showBook_get)

//Edit book route
// URl = /books/:id ,method : get
router.get('/:id/edit',bookController.editBook_get)

//Update book route
// URl = /books/:id ,method : get
router.put('/:id',bookController.updateBook_put)

//Delete book route
// URl = /books/:id ,method : get
router.delete('/:id',bookController.dltBook_delete)

module.exports = router