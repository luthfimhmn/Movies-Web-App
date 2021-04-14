import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_MOVIES } from '../queries'
import Movie from '../components/Movie'
import Loading from '../components/Loading'

function Home () {
  const { loading, error, data} = useQuery(GET_MOVIES)

  if (loading) return (
    <Loading/>
  )
  if (error) return <h1>Error {error.message}</h1>

  return (
    <>
      <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Popularity</th>
              <th>Overview</th>
              <th>Poster</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
      { data.movies.map((movie, index) => {
        return (
          <Movie
            movie={movie}
            index={index}
            key={movie._id}
            category='movies'
          >
          </Movie>
        )
      })
      }
      </tbody>
        </table><br/><br/>
    </>
  )
}

export default Home;