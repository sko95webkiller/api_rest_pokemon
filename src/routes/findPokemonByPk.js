//avec require('../db/sequelize'), on récupère le model Pokemon=pokemonModel(sequelize, DataTypes)
const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            const message=` Vous avez bien récupéré le pokemon n°${pokemon.id}, de nom:${pokemon.name}. Bravo !!! `
            res.json({ message, data: pokemon })
        })
    })
}