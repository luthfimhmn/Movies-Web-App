const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
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

  input SeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    movies: [Movie],
    series: [Series]
  }

  type Mutation {
    addMovie(newMovie: MovieInput): Movie,
    addSeries(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Series,
    updateMovie(id: ID!, updatedMovie: MovieInput): Movie,
    updateSeries(id: ID!, updatedSeries: SeriesInput): Series
    deleteMovie(id: ID!): String
    deleteSeries(id: ID!): String
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    movies: async () => {
      try {
        const { data } = await axios.get('http://localhost:3000')
        return data
      } catch (error) {
        throw error
      }
    },
    series: async () => {
      try {
        const { data } = await axios.get('http://localhost:3002')
        return data
      } catch (error) {
        throw error
      }
    },
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
    deleteMovie: async (_, args) => {
      try {
        const id = args.id
        const { data } = await axios.delete(`http://localhost:3000/${id}`)
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
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
