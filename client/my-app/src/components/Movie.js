import { useMutation } from '@apollo/client'
import { favoritesVar } from '../graphql/vars'
import { DELETE_MOVIE } from '../queries'

function Movie (props) {
  const [destroyMovie] = useMutation(DELETE_MOVIE)

  const addToFavorite = () => {
    const existingFavorites = favoritesVar()
    const newData = props.movie
    const temp = existingFavorites.concat(newData)
    favoritesVar(temp)
  }

  const toDetail = () => {
    console.log('To detail');
  }

  function deleteMovie (id) {
    console.log(id , 'ini idnya');
    console.log('masuk delete movie');
    destroyMovie({
      variables: {
        id
      }
    })
  }

  function removeFavorites (id) {
    const existingFavorites = favoritesVar()
    const temp = existingFavorites.filter(favorite => favorite._id !== id)
    favoritesVar(temp)
  }

  if(props.category === 'movies') {
    console.log(props.category);
    return (
      <>
         <tr>
          <td>{props.index + 1}</td>
          <td>{props.movie.title}</td>
          <td>{props.movie.popularity}</td>
          <td>{props.movie.overview}</td>
          <td>
            <img src={props.movie.poster_path} alt=""/>
          </td>
          <td>
            <button onClick={() => addToFavorite(props.movie)} className="btn btn-primary">Favorite</button>
            <button onClick={() => toDetail(props.movie._id)} className="btn btn-primary">Detail</button>
            <button onClick={() => deleteMovie(props.movie._id)} className="btn btn-primary">Delete</button>
          </td>
        </tr>
      </>
    )
  } else if (props.category === 'favorites') {
    return (
      <>
        <tr>
          <td>{props.index + 1}</td>
          <td>{props.movie.title}</td>
          <td>{props.movie.popularity}</td>
          <td>{props.movie.overview}</td>
          <td>
            <img src={props.movie.poster_path} alt=""/>
          </td>
          <td>
            <button onClick={() => addToFavorite(props.movie)} className="btn btn-primary">Favorite</button>
            <button onClick={() => toDetail(props.movie._id)} className="btn btn-primary">Detail</button>
            <button onClick={() => removeFavorites(props.movie._id)} className="btn btn-primary">Remove From Favorite</button>
          </td>
        </tr>
      </>
    )
  }


}

export default Movie;