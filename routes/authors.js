const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authorController')

//get all the authors
// URl = /authors ,method : get
router.get('/',authorController.allAuthors)

//New author route
// URl = /authors/new ,method : get
router.get('/new',authorController.newAuthor_get)

//Search author
// URl = /authors ,method : post
router.post('/',authorController.newAuthor_post)

//Show/view author
// URl = /authors/:id ,method : get
router.get('/:id',authorController.showAuthor_get)

//Edit author 
// URl = /authors/:id/edit ,method : get
router.get('/:id/edit',authorController.editAuthor_get)

//update author
// URl = /authors/:id ,method : put
router.put('/:id',authorController.updateAuthor_put)

//Delete author
// URl = /authors/:id ,method : delete
router.delete('/:id',authorController.dltAuthor_delete)

module.exports = router