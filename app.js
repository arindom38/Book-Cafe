//checcking form which production the app is running
if(process.env.NODE_ENV !== 'Production'){
    require('dotenv').config() // automatically load the .env file
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')

//import custom modules
const  indexRouter = require('./routes/index')
const auhtorsRouter = require('./routes/authors')

//set up app strututre
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')

//using middele-ware
app.use(expressLayouts) //layout
app.use(morgan('dev')) //log generator
app.use(express.static('public')) //public resources

//database connectioon
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, { //running app in development env need this
    useNewUrlParser:true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error',error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//routes (url,rountername)
app.use('/',indexRouter)
app.use('/authors',auhtorsRouter)
//port listen
app.listen(process.env.PORT || 3000) //process.env.PORT automatically get the port number from environemnt