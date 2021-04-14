const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const baseUrl = 'http://localhost:4001/'

const typeDefs = gql`
  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type ResponseMovieDelete {
    message: String
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
    movie(movieId: ID!): Movie
  }

  extend type Mutation {
    addMovie(newMovie: MovieInput): Movie
    updateMovie(id: ID!, updatedMovie: MovieInput): Movie
    deleteMovie(id: ID!): ResponseMovieDelete
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const moviesData = await redis.get('movies:data')
        if (!moviesData) {
          console.log('Not cached yet')
          const { data } = await axios.get(baseUrl)
          await redis.set('movies:data', JSON.stringify(data))
          return data
        } else {
          console.log('Cached!');
          return (JSON.parse(moviesData))
        }
      } catch (error) {
        throw error
      }
    },
    movie: async (_, args) => {
      try {
        const id = args.movieId
        const { data } = await axios.get(baseUrl + id)
        return data
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        await redis.del('movies:data')
        const newMovie = {
          title: args.newMovie.title,
          overview: args.newMovie.overview,
          poster_path: args.newMovie.poster_path,
          popularity: args.newMovie.popularity,
          tags: args.newMovie.tags
        }
        const { data } = await axios.post(baseUrl, newMovie)
        return data
      } catch (error) {
        throw error
      }
    },
    updateMovie: async (_, args) => {
      try {
        await redis.del('movies:data')
        const updatedMovie = {
          title: args.updatedMovie.title,
          overview: args.updatedMovie.overview,
          poster_path: args.updatedMovie.poster_path,
          popularity: args.updatedMovie.popularity,
          tags: args.updatedMovie.tags
        }
        const id = args.id
        const { data } = await axios.put(baseUrl + id, updatedMovie)
        return data
      } catch (err) {
        throw error
      }
    },
    deleteMovie: async (_, args) => {
      try {
        await redis.del('movies:data')
        const id = args.id
        const { data } = await axios.delete(baseUrl + id)
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