import Movie from '../components/Movie'

function SeriesPage (props) {
  return (
    <>
     <h1>Series Page</h1>

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
      { props.series.map((movie, index) => {
        return (
          <Movie
            movie={movie}
            index={index}
            key={movie._id}
            category='series'
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

export default SeriesPage