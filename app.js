const express = require('express')
const morgan= require('morgan')
const favicon=require('serve-favicon')
const bodyParser = require('body-parser')

const app=express()
const port=3000
const sequelize = require('./src/db/sequelize')

//Middleware pour debugger les connexions http
app
.use(morgan('dev'))
.use(favicon(__dirname + '/favicon.ico'))
.use(bodyParser.json())

sequelize.test_db()
sequelize.initDb()

//ici, nous placerons nos futurs points de terminaison
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)

app.listen(port, () => console.log(`Express Server is running ! URL:  http://localhost:${port}`))

