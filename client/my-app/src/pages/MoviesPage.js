import Movie from '../components/Movie'


function MoviesPage (props) {
  return (
    <>
     <h1>Movies Page</h1>
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
      { props.movies.map((movie, index) => {
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

export default MoviesPage