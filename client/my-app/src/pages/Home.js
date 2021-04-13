import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_MOVIES } from '../queries'
import { useReactiveVar } from '@apollo/client'
import { favoritesVar } from '../graphql/vars'
import Movie from '../components/Movie'
import Loading from '../components/Loading'

function Home () {
  const { loading, error, data: movies, refetch} = useQuery(GET_MOVIES)
  const favorites = useReactiveVar(favoritesVar)


  const [inputForm, setInputForm] = useState({
    title: '',
    overview: 0
  })

  if (loading) return (
    <Loading/>
  )
  if (error) return <h1>Error {error.message}</h1>

  return (
    <>
      {JSON.stringify(movies)}
      <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
      { movies.movies.map((movie, index) => {
        return (
          <Movie
            movie={movie}
            index={index}
            key={movie._id}
          >
          </Movie>
        )
      })
      }
      </tbody>
        </table><br/><br/>
      <h1>Ini home</h1>

      <h1>Favorite</h1>
      {JSON.stringify(favorites)}
    </>
  )
}

export default Home;