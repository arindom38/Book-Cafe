const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

//get all the authors
// URl = /authors ,method : get
router.get('/',bookController.allBook)

//New author route
// URl = /authors/new ,method : post
router.get('/new',bookController.newBook_get)

//create new author
// URl = /authors ,method : post
router.post('/',bookController.newBook_post)

module.exports = router