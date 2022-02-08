const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "Query to get the pokedex data"
    pokemonForHome: [Pokemon!]!
  }

  "A pokemon and all of its details"
  type Pokemon {
    name: String!
    url: String!
    data: PokemonData
  }

  type PokemonData {
    id: Int!
    name: String!
    height: Int
    weight: Int
    sprites: Sprites
    types: [PokeType]
    moveData: [Move!]!
  }

  type Sprites {
    front_default: String
  }

  type PokeType {
    type: PokeTypeData
  }

  type PokeTypeData {
    name: String
  }

  "The Pokemon's move information"
  type Move {
    id: Int!
    name: String!
    pp: Int
    description: [MoveDesc]
  }

  type MoveDesc {
    flavor_text: String
  }
`


module.exports = typeDefs