const resolvers = {
  Query: {
    pokemonForHome: (_, __, {dataSources}) => {
      return dataSources.pokeAPI.getPokedex()
    },
    favourite: (_, { email }, { dataSources }) => {
      return dataSources.favouriteAPI.getFavourite(email)
    },
    pokemonForFavourites: (_, { ids }, {dataSources}) => {
      return dataSources.pokeAPI.getFavourites(ids)
    }
  },
  Mutation: {
    // adds a new user to the DB
    updateFavourite: async (_, { email, favourites }, { dataSources }) => {
      try {
        const response = await dataSources.favouriteAPI.updateFavourite(email, favourites);
        return {
          code: 200,
          success: true,
          message: `Successfully updated favourites for user with email: ${email}`,
          response,
        }
      } catch (err) {
        console.log('err is ', err)
        return {
          code: 400,
          success: false,
          message: "Yikes! There was an error adding favourites.",
          response: null,
        }
      }
    },
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
  },
  Favourite: {
    pokemon: ({favourites}, _, {dataSources}) => {
      return dataSources.pokeAPI.getFavourites(favourites)
    }
  }
}

module.exports = resolvers