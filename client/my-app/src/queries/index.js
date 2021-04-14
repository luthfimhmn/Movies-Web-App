import { gql } from '@apollo/client'

export const GET_ALL = gql`
{
  movies {
    _id
    title
    popularity
    overview
    poster_path
    tags
  }
  series {
    _id
    title
    popularity
    overview
    poster_path
  }
}
`



export const ADD_MOVIE = gql`
mutation AddMovie($newMovie: MovieInput) {
  addMovie(newMovie: $newMovie) {
    _id
    title
    overview
    popularity
    poster_path
    tags
  }
}`

export const UPDATE_MOVIE = gql`
mutation UpdateMovie($id: ID!, $updatedMovie: MovieInput) {
  updateMovie(id: $id, updatedMovie: $updatedMovie) {
    title
    overview
    popularity
    poster_path
    tags
  }
}`

export const DELETE_MOVIE = gql`
mutation DeleteMovie($id: ID!) {
  deleteMovie(id: $id) {
    message
  }
}
`