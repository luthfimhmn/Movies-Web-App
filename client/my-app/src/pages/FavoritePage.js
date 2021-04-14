import { useReactiveVar } from "@apollo/client"
import { favoritesVar } from "../graphql/vars"
import Movie from '../components/Movie'

function Favorite (props) {
  const favorites = useReactiveVar(favoritesVar)
  return (
    <>
    <h1>Favorite Page</h1>
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
      { favorites.map((movie, index) => {
        return (
          <Movie
            movie={movie}
            index={index}
            key={movie._id}
            category='favorites'
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

export default Favorite