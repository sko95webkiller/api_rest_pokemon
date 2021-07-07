//avec require('../db/sequelize'), on récupère le model Pokemon=pokemonModel(sequelize, DataTypes)
const { Pokemon } = require('../db/sequelize')

module.exports =(app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
    //const id=req.params.id 
    Pokemon.findByPk(req.params.id)
        .then(pokemon =>{
            Pokemon.destroy({ where: { id: req.params.id } })
            .then(nb_result => {
                const message=` Vous avez effacé ${nb_result} pokemon`+
                ` de id n°: ${pokemon.id} et de nom: ${pokemon.name}. Bravo !!! `
                res.json({ message, data: pokemon })
            })
        })            
    })
}
