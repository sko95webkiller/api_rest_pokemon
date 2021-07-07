//avec require('../db/sequelize'), on récupère le model Pokemon=pokemonModel(sequelize, DataTypes)
const { Pokemon } = require('../db/sequelize')

module.exports =(app) => {
    app.put('/api/pokemons/:id', (req, res) => {
    const id=req.params.id 
    Pokemon.update(req.body, {
            where: {id: id }
        })
        .then(_ => {
            Pokemon.findByPk(id).then(pokemon => {
                const message=`Vous avez bien modifié le pokemon ${pokemon.name}, bravo !!!`
                res.json({ message, data: pokemon })
            })
        })
    })
}
