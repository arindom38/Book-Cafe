const express = require('express')
const router = express.Router()
const Book = require('../models/booksModel')
const indexController = require('../controllers/indexController')

router.get('/',indexController.indexGetRecent)

module.exports = router