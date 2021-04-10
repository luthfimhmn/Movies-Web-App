const { gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
 type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  input SeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  extend type Query {
    series: [Series]
  }

  extend type Mutation {
    addSeries(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Series,
    updateSeries(id: ID!, updatedSeries: SeriesInput): Series
    deleteSeries(id: ID!): String
  }
`

const resolvers = {
  Query: {
    series: async () => {
      try {
        const { data } = await axios.get('http://localhost:3002')
        return data
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    addSeries: async (_, args) => {
      try {
        const newSeries = {
          title: args.title,
          overview: args.overview,
          poster_path: args.poster_path,
          popularity: args.popularity,
          tags: args.tags
        }
        const { data } = await axios.post('http://localhost:3002', newSeries)
        return data
      } catch (error) {
        throw error
      }
    },
    deleteSeries: async (_, args) => {
      try {
        const id = args.id
        const { data } = await axios.delete(`http:localhost:3002/${id}`)
        return data
      } catch (error) {
        throw error
      }
    },
    updateSeries: async (_, args) => {
      try {
        const updatedSeries = {
          title: args.updatedSeries.title,
          overview: args.updatedSeries.overview,
          poster_path: args.updatedSeries.poster_path,
          popularity: args.updatedSeries.popularity,
          tags: args.updatedSeries.tags
        }
        const id = args.id
        const { data } = await axios.put(`http://localhost:3002/${id}`, updatedSeries)
        return data
      } catch (error) {
        throw error
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}