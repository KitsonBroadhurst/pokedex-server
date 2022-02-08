const resolvers = {
  Query: {
    pokemonForHome: (_, __, {dataSources}) => {
      return dataSources.pokeAPI.getPokedex()
    }
  },
  Pokemon: {
    data: ({url}, _, {dataSources}) => {
      return dataSources.pokeAPI.getPokemon(url)
    }
  },
  PokemonData: {
    moveData: ({moves}, _, {dataSources}) => {
      return dataSources.pokeAPI.getMovesByNames(moves)
    }
  }
}

module.exports = resolvers