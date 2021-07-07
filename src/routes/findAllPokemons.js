//avec require('../db/sequelize'), on récupère le model Pokemon=pokemonModel(sequelize, DataTypes)
const { Pokemon } = require('../db/sequelize')

module.exports =(app) => {
    app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
        .then(pokemon => {
            const message=`Vous avez bien récupéré la liste de tous les pokemons. Bravo !!! `
            res.json({ message, data: pokemon })
        })
        .catch(error => console.log(error))
})
}