const express = require('express')
const router = express.Router()
const Author = require('../models/authorsModel')
//get all the authors
router.get('/',(req,res)=>{
    res.render('authors/index')
})

//New author route
router.get('/new',(req,res)=>{
    res.render('authors/new',{author: new Author()})
})

//create new author
router.post('/',(req,res)=>{
    res.render('create')
})

module.exports = router