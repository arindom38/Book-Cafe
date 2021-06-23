const Author = require('../models/authorsModel')
const Book = require('../models/booksModel')

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
            res.redirect(`/authors/${result.id}`) //on save success redirect to the new author view page
        })
        .catch((err)=>{
            res.render('authors/new',{ //if errro in creating new author the user should see the error in the same page
                author: author,
                errorMssg: 'Error Creating Author'
            })
        })
}

const  showAuthor_get = async (req,res)=>{
    try {
        const author = await Author.findById(req.params.id)
        await Book.find({author: req.params.id}).limit(6)
        .then((result)=>{
             res.render('authors/show',{
                 booksByAuthor:result,
                 author:author
             })
        })
    } catch (error) {
        res.redirect('/')
    }

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

//When author is updated
const  updateAuthor_put = async (req,res)=>{
    await Author.findById(req.params.id) //first the find the author
        .then((resultfind)=>{ //if author is found
            resultfind.name = req.body.name // update the name from the body
             resultfind.save() // then save update
                .then((resultsave)=>{
                    res.redirect(`/authors/${resultsave.id}`) //when save succes redirect to author view page
                })
                .catch((err)=>{ // if save not sucess keep in the same page
                    res.render('authors/edit',{
                        author:resultsave,
                        errorMssg: 'Error Updating Author' //show error mssg
                    })
                })
        })
        .catch((err)=>{ //when author is not found
            res.redirect('/') //redirect to home page
        })
}

const  dltAuthor_delete = async (req,res)=>{
    await Author.findById(req.params.id) //first the find the author
    .then((resultfind)=>{ //if author is found
         resultfind.remove() // then remove author
            .then((result)=>{
                res.redirect('/authors') //when remove succes redirect to authors view page
            })
            .catch((err)=>{ // if remove not sucess keep in the same page
                res.redirect(`/authors/${resultfind.id}`) // result find need to use as the after removing result null
            })
    })
    .catch((err)=>{ //when author is not found
        res.redirect('/') //redirect to home page
    })
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