const express = require('express')
const app = express();
const stockRoutes = require('../routes/stock.routes')
const  userRoutes = require('../routes/user.routes')
const halaRoutes = require('../routes/hala.routes')

require('dotenv').config()
require('../db/connection')



const cors = require('cors')
app.use(cors())

app.use( express.urlencoded( { extended : true } ) )
app.use(express.json())

app.use('/stock',stockRoutes)

app.use('/user', userRoutes )

app.use('/hala' , halaRoutes)

module.exports = app