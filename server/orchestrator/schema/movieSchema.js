const { gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input MovieInput {
      title: String
      overview: String
      poster_path: String
      popularity: Float
      tags: [String]
    }

  extend type Query {
    movies: [Movie]
  }

  extend type Mutation {
    addMovie(newMovie: MovieInput): Movie
    updateMovie(id: ID!, updatedMovie: MovieInput): Movie
    deleteMovie(id: ID!): String
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const { data } = await axios.get('http://localhost:3000')
        return data
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        const newMovie = {
          title: args.newMovie.title,
          overview: args.newMovie.overview,
          poster_path: args.newMovie.poster_path,
          popularity: args.newMovie.popularity,
          tags: args.newMovie.tags
        }
        const { data } = await axios.post('http://localhost:3000', newMovie)
        return data
      } catch (error) {
        throw error
      }
    },
    updateMovie: async (_, args) => {
      try {
        const updatedMovie = {
          title: args.updatedMovie.title,
          overview: args.updatedMovie.overview,
          poster_path: args.updatedMovie.poster_path,
          popularity: args.updatedMovie.popularity,
          tags: args.updatedMovie.tags
        }
        const id = args.id
        const { data } = await axios.put(`http://localhost:3000/${id}`, updatedMovie)
        return data
      } catch (err) {
        throw error
      }
    },
    deleteMovie: async (_, args) => {
      try {
        const id = args.id
        const { data } = await axios.delete(`http://localhost:3000/${id}`)
        return data
      } catch (error) {
        throw error
      }
    },
  }
}

module.exports = {
  typeDefs,
  resolvers
}