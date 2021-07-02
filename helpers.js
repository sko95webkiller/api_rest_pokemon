//const { pokemon } = require("./mock-pokemon-test")

exports.success=(message,data)=>{
    return {message,data}
}

exports.successBIS=(message,data)=>{
    return {message,data}
}

exports.getUniqueId=(pokemon) => {
    const pokemondId=pokemon.map(pokemon=>pokemon.id)
    const maxId=pokemondId.reduce((a,b) => Math.max(a,b))
    const uniqueId=maxId+1
    console.log(uniqueId)
    return uniqueId
}