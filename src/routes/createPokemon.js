//avec require('../db/sequelize'), on récupère le model Pokemon=pokemonModel(sequelize, DataTypes)
const { Pokemon } = require('../db/sequelize')

module.exports =(app) => {
    app.post('/api/pokemons', (req,res) => { 
    Pokemon.create(req.body)
        .then(pokemon =>{
        const message=`Vous avez crée un nouveau pokemon`+
             ` de id n°:${pokemon.id} et de nom:${pokemon.name}. Bravo !!!`
        res.json({ message, data: pokemon })
        })
    })
}
