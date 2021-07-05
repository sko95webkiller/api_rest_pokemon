const { Sequelize, DataTypes } = require('sequelize')
const pokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')

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

const test_db = ()=>{
return sequelize.authenticate()
       .then(_ => console.log('Vous êtes bien connecté à la base de donnée pokedex du serveur MySQL !!!'))
       .catch(error => console.error(`ECHEC DE CONNEXION: ${error}`))
}
const Pokemon=pokemonModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({force:true})
       .then(_=>{
           console.log(`La base de données Pokemon a été synchronisée avec succès!`)
           for(let pokemon of test)
            Pokemon.create({
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types.join(',')
            })
           .then(bullbizarre => console.log(bullbizarre.toJSON()))
       })
       .catch(error=>console.error(`ERREUR DE SYNCHRO ${error}`))
}

module.exports = {
    initDb, Pokemon, test_db
}
