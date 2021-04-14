import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL } from '../queries'
import Loading from '../components/Loading'
import SeriesPage from './SeriesPage'
import MoviesPage from './MoviesPage'

function Home () {
  const { loading, error, data, refetch } = useQuery(GET_ALL)

  useEffect(() => {
    refetch()
  }, [refetch])

  if (loading) return (
    <Loading/>
  )
  if (error) return <h1>Error {error.message}</h1>

  return (
    <>
      <MoviesPage
        movies={data.movies}
      />

      <SeriesPage
        series={data.series}
      />
    </>
  )
}

export default Home;