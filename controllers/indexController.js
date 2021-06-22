const Book = require('../models/booksModel')

const indexGetRecent = async (req,res)=>{
    await Book.find().sort({createdDate: -1}).limit(4)
        .then((result)=>{
            res.render('index',{
                books: result
            })
        })
        .catch((err)=>{
            res.redirect('/404')
        })
}

module.exports = {
    indexGetRecent
}