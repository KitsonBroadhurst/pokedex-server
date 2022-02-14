const { RESTDataSource } = require("apollo-datasource-rest")

class PokeAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://pokeapi.co/api/v2/"
  }

  // return a litst of Pokemon for the home page of the Pokedex
  // by default this endpoint returns the first 20 Pokemon
  async getPokedex() {
    const response = await this.get("pokemon")
    return response.results
  }

  getPokemon(url) {
    return this.get(url)
  }

  async getPokemonById(id) {
    const response = await this.get(`/pokemon/${id}`)
    return response
  }

  getFavourites(ids = []) {
    return Promise.all(
      ids.map(id => this.getPokemonById(id))
    )
  }

  async getMoveByName(moveName) {
    const response = await this.get(`/move/${moveName}`)
    const englishDescription = response.flavor_text_entries.filter(entry => entry.language.name === "en")
    return {...response, description: englishDescription}
  }

  getMovesByNames(moves) {
    const firstTwo = moves.length > 2 ? [moves[0], moves[1]] : [moves]
    return Promise.all(
      firstTwo.map(({ move }) => this.getMoveByName(move.name))
    )
  }
}

module.exports = PokeAPI