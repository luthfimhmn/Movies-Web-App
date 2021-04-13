import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
{
  movies {
    _id
    title
    popularity
    overview
    poster_path
  }
}
`

export const ADD_MOVIE = gql`
mutation AddMovie($newMovie: newMovie) {
  addMovie(movie: $newMovie) {
    title
    popularity
    overview
    poster_path
  }
}`