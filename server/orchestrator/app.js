const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type Movie {
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Series {
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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    movies: [Movie],
    series: [Series]
  }

  type Mutation {
    addMovie(newMovie: MovieInput): Movie,
    addSeries(title: String, overview: String, poster_path: String, popularity: Float, tags: [String]): Series
  }
`;

// const books = [
//   {
//     title: 'The Awakening',
//     author: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     author: 'Paul Auster',
//   },
// ];


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
