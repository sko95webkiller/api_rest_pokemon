const express = require('express')
const app=express()
const port=3000
const morgan= require('morgan')
const favicon=require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

app.use(morgan('dev'))
app.use(favicon(__dirname + '/favicon.ico'))
app.use(bodyParser.json())

sequelize.test_db()
sequelize.initDb()

//ici, nous placerons nos futurs points de dterminaison

app.listen(port, () => console.log(`Express Server is running ! URL:  http://localhost:${port}`))

