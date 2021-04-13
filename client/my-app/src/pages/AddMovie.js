import { useMutation } from "@apollo/client";
import { ADD_MOVIE } from "../queries";

function AddMovie () {

  const [addMovie, { data }] = useMutation(ADD_MOVIE)
  const formOnSubmit = (e) => {
    e.preventDefault();
    console.log('test');
  }

  return (
    <>
      <div className="container center">
        <h1>Add Movie Form</h1>
        <form onSubmit={e => formOnSubmit(e)}>
        <label htmlFor="first_name">Title :</label><br/>
        <input
          id="name"
          name="first_name"
          placeholder="Title"
          type="text"
        />
        <br/>

        <label htmlFor="last_name">Overview :</label><br/>
        <input
          id="last_name"
          type="text"
          name="last_name"
          placeholder="Overview"
        /><br/>

        <label htmlFor="email">Poster Path :</label><br/>
        <input
          id="email"
          type="text"
          name="email"
          placeholder="Poster Path"
        /><br/>

        <label htmlFor="avatar">Popularity :</label><br/>
        <input
          id="avatar"
          type="text"
          name="avatar"
          placeholder="Popularity"
        /><br/>

        <label htmlFor="avatar">Tags :</label><br/>
        <input
          id="avatar"
          type="text"
          name="avatar"
          placeholder="Tags"
        /><br/><br/>


        <button className="btn btn-primary">submit</button>
        </form>
      </div>
    </>
  )
}


export default AddMovie