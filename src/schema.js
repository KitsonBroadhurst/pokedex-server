const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "Query to get the pokedex data"
    pokemonForHome: [Pokemon!]!
    "Fetch a specific user from MongoDB by email"
    favourite(email: String): Favourite
    "Fetch a users favourite Pokemon by a list of IDs"
    pokemonForFavourites(ids: [Int]!): [PokemonData]!
  }

  type Mutation {
    "Add or update a user's favourite Pokemon"
    updateFavourite(email: String!, favourites: [Int!]!): AddFavouriteResponse!
  }

  type AddFavouriteResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String!
    "Newly updated track after a successful mutation"
    response: FavouriteResponse
  }

  type FavouriteResponse {
    acknowledged: Boolean
    insertedId: ID
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

  "A signed up user's favourite Pokemon"
  type Favourite {
    "User's email address"
    email: String!
    "A users favourite pokemon stored as an array of pokemon ids"
    favourites: [Int!]!
    "A users favourite pokemon stored"
    pokemon: [PokemonData!]!
  }
`


module.exports = typeDefs