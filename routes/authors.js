const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authorController')
//get all the authors
// URl = /authors ,method : get
router.get('/',authorController.allAuthors)

//New author route
// URl = /authors/new ,method : post
router.get('/new',authorController.newAuthor_get)

//create new author
// URl = /authors ,method : post
router.post('/',authorController.newAuthor_post)

module.exports = router