import { favoritesVar } from '../graphql/vars'

function Movie (props) {
  const addToFavorite = () => {
    const existingFavorites = favoritesVar()
    const newData = props.movie
    const temp = existingFavorites.concat(newData)

    favoritesVar(temp)
  }

  const toDetail = () => {
    console.log('To detail');
  }

  return (
    <>
       <tr>
        <td>{props.index + 1}</td>
        <td>{props.movie.title}</td>
        <td>{props.movie.popularity}</td>
        <td>{props.movie.overview}</td>
        <td>
          <img src={props.movie.avatar} alt=""/>
        </td>
        <td>
          <button onClick={() => addToFavorite(props.movie)} className="btn btn-primary">Favorite</button>
          <button onClick={() => toDetail(props.movie.id)} className="btn btn-primary">Detail</button>
        </td>
      </tr>
    </>
  )
}

export default Movie;