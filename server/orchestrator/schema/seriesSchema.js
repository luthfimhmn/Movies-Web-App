const { gql } = require('apollo-server');
const axios = require('axios');
const Redis = require('ioredis');
const redis = new Redis();
const baseUrl = 'http://localhost:4002/'

const typeDefs = gql`
 type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type ResponseSeriesDelete {
    message: String
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
    deleteSeries(id: ID!): ResponseSeriesDelete
  }
`

const resolvers = {
  Query: {
    series: async () => {
      try {
        const seriesData = await redis.get('series:data')
        if (!seriesData) {
          console.log('Not cached yet')
          const { data } = await axios.get(baseUrl)
          await redis.set('series:data', JSON.stringify(data))
          return data
        } else {
          console.log('Cached!')
          return (JSON.parse(seriesData))
        }
      } catch (error) {
        throw error
      }
    }
  },
  Mutation: {
    addSeries: async (_, args) => {
      try {
        await redis.del('series:data')
        const newSeries = {
          title: args.title,
          overview: args.overview,
          poster_path: args.poster_path,
          popularity: args.popularity,
          tags: args.tags
        }
        const { data } = await axios.post(baseUrl, newSeries)
        return data
      } catch (error) {
        throw error
      }
    },
    deleteSeries: async (_, args) => {
      try {
        await redis.del('series:data')
        const id = args.id
        const { data } = await axios.delete(baseUrl + id)
        return data
      } catch (error) {
        throw error
      }
    },
    updateSeries: async (_, args) => {
      try {
        await redis.del('series:data')
        const updatedSeries = {
          title: args.updatedSeries.title,
          overview: args.updatedSeries.overview,
          poster_path: args.updatedSeries.poster_path,
          popularity: args.updatedSeries.popularity,
          tags: args.updatedSeries.tags
        }
        const id = args.id
        const { data } = await axios.put(baseUrl + id, updatedSeries)
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