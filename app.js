const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')

//import custom modules
const  indexRouter = require('./routes/index')

//set up app strututre
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')

//using middele-ware
app.use(expressLayouts) //layout
app.use(morgan('dev')) //log generator
app.use(express.static('public')) //public resources


//routes (url,rountername)
app.use('/',indexRouter)

//port listen
app.listen(process.env.PORT || 3000) //process.env.PORT automatically get the port number from environemnt