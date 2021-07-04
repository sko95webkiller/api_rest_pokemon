const express = require('express')
const app=express()
const port=3000
const pokemons=require('./mock-pokemon')
const { success,getUniqueId }=require('./helpers')
const morgan= require('morgan')
const favicon=require('serve-favicon')
const fs=require('fs')
const path=require('path')
const { Stream, Writable } = require('stream')
const { Body } = require('node-fetch')
const bodyParser = require('body-parser')
const { Sequelize,DataTypes } = require('sequelize')
const pokemonModel=require('./src/models/pokemon')

const sequelize=new Sequelize(
 'pokedex',
 'root',
 '',
 {
     host: 'localhost',
     dialect: 'mysql'
    //  dialectOptions: {
    //      timezone: 'Etc/GMT-2'
    //  },
    //  logging: false
 }
 )

 sequelize.authenticate()
    .then(_ => console.log('Vous êtes bien connecté à la base de donnée pokedex du serveur MySQL !!!'))
    .catch(error => console.error(`ECHEC DE CONNEXION: ${error}`))

const Pokemon=pokemonModel(sequelize, DataTypes)
sequelize.sync({force:true})
    .then(_=>{
        console.log(`La base de données Pokemon a été synchronisée avec succès!`)
        for(let pokemon of pokemons)
        Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join(',')
        })
        .then(bullbizarre=>console.log(bullbizarre.toJSON()))
    })
    .catch(error=>console.error(`ERREUR DE SYNCHRO ${error}`))



app.use(morgan('dev'))
app.use(favicon(__dirname + '/favicon.ico'))
app.use(bodyParser.json())

app.get('/', (req,res) => {res.send('Hello Express ! 🍕🥥' )})
app.get('/api/test', (req,res) => {res.send('<strong>Test URL: http://localhost/api/test ! </strong>')})


function listNamePokemons(pokemon){
    let tab=new Array()
      for(let value of pokemon){
        tab.push(value.name)
       }
    return tab
}
app.get('/api/pokemons/misc/list',(req,res)=>{
    let tab2=listNamePokemons(pokemons).map(element => `<li>${element}</li>`)
    let tab3=tab2.toString().replace(/,/g, '')
    res.send(`<ul>${tab3}</ul>`)
    //console.log(tab3)  
})
app.get('/api/pokemons/misc/count',(req,res)=>{
    const message=`Il y a ${pokemons.length} pokemons dans la liste, bravo !!!`
    res.send(success(message))
})
//************************************************************************************** */
//get one pokemon
// **** READ ****
app.get('/api/pokemons/:id',(req,res)=>{
    const id=parseInt(req.params.id)
    res.send(`Vous avez demandé le pokemon n° ${id}`)
})
//get all of pokemons
// **** READ ****
app.get('/api/pokemons',(req,res)=>{
    const message=`Vous avez bien récupérer la liste des ${pokemons.length} pokemons, bravo !!!`
    res.json(success(message,pokemons))
})
//add a pokemon
// **** CREATE ****
app.post('/api/pokemons', (req,res) => {
    //const id=parseInt(pokemon.pokemon.length+1)
    const id=getUniqueId(pokemons)
    const pokemonCreated={...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    console.log(pokemonCreated)
    const message=`Le pokemon ${pokemonCreated.name} a été inséré avec succés`
    res.json(success(message,pokemonCreated))
})
//modify a pokemon.name
// **** UPDATE ****
app.put('/api/pokemons/:id', (req,res) => {
    const id=parseInt(req.params.id)
    const pokemonToUpdate=pokemons.find(v=>v.id=id)
    const pokemonsNew=pokemons.filter(pokemon=>pokemon.id != id)
    const pokemonUpdated = {...{id:id}, ...req.body, ...{created: new Date()}}
    pokemonsNew.unshift(pokemonUpdated)
    const message=`Le pokemon ${pokemonToUpdate.name} a été modifié en ${pokemonUpdated.name} avec succés`
    res.json(success(message, pokemonUpdated))
})
//delete a pokemon
// **** DELETE ****
app.delete('/api/pokemons/:id', (req,res) => {
    const id=parseInt(req.params.id)
    const pokemonDeleted=pokemons.find(pokemon=>pokemon.id===id)
    console.log(pokemonDeleted)
    const pokemonsNew=pokemons.filter(pokemon=>pokemon.id !== id)
    const message=`Le pokemon ${pokemonDeleted.name} a été effacé avec succés`
    res.json(success(message,pokemonDeleted))
})

app.listen(port, () =>
    console.log(`Express Server is running ! URL:  http://localhost:${port}`)
)

