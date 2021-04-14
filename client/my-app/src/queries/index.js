import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
{
  movies {
    _id
    title
    popularity
    overview
    poster_path
    tags
  }
}
`

export const ADD_MOVIE = gql`
mutation AddMovie($newMovie: newMovie) {
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
mutation UpdateMovie($id: ID!, $updatedMovie: updatedMovie) {
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
  deleteMovie(id: $id)
}
`