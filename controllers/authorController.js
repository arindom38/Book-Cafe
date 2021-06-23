const Author = require('../models/authorsModel')

const allAuthors = async (req,res)=>{
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
}

const newAuthor_get = async (req,res)=>{
    res.render('authors/new',{author: new Author()}) //while rendering the file the model is also available in hte ejs
}

const newAuthor_post = async (req,res)=>{ //make the call back async will not block the code below this code
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
}

const  showAuthor_get = async (req,res)=>{
    res.send('View Authors: '+req.params.id)
}

const  editAuthor_get = async (req,res)=>{
   await Author.findById(req.params.id)
    .then((result)=>{
        res.render('authors/edit',{author:result})
    })
    .catch(err=>{
        res.redirect('/authors')
    })
}

const  updateAuthor_put = async (req,res)=>{
    res.send('Update Authors: '+req.params.id)
}

const  dltAuthor_delete = async (req,res)=>{
    res.send('Delete Authors: '+req.params.id)
}

module.exports = {
    allAuthors,
    newAuthor_get,
    newAuthor_post,
    showAuthor_get,
    editAuthor_get,
    updateAuthor_put,
    dltAuthor_delete
}