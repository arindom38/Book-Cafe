const express = require('express')
const router = express.Router()
const Author = require('../models/authorsModel')

//get all the authors
// URl = /authors ,method : get
router.get('/',async (req,res)=>{
    let searchToken = {}
    //when user click 'authors' link req query will be empty so searchtoken is blank so all the authors will be shown
    //when user search for a author, a form submit event (get request with a qery string pass and show the realed user onl)
    if(req.query.name != null && req.query.name !== ''){
        //regex used serach for both upper and lower case . i indicate case insensitive
        searchToken.name = new RegExp(req.query.name,'i')
    }
    await Author.find(searchToken)
        .then((result)=>{
            res.render('authors/index',{
                authors:result,
                searchToken: req.query
            })
        })
        .catch(()=>{
            res.redirect('/')
        })
})

//New author route
// URl = /authors/new ,method : post
router.get('/new',async(req,res)=>{
    res.render('authors/new',{author: new Author()}) //while rendering the file the model is also available in hte ejs
})

//create new author
// URl = /authors ,method : post
router.post('/',async (req,res)=>{ //make the call back async will not block the code below this code
    const author = new Author({
        name: req.body.name
    })
    author.save()
        .then((result)=>{
            //res.redirect(`authors/${newAuthor:id}`)
            res.redirect('authors')
        })
        .catch((err)=>{
            res.render('authors/new',{ //if errro in creating new author the user should see the error in the same page
                author: author,
                errorMssg: 'Error Creating Author'
            })
        })
})

module.exports = router