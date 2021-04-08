const { getDatabase } = require('../config/mongodb');

class Movie {
  constructor (id, title, overview, poster_path, popularity, tags){
    this.id = id
    this.title = title
    this.overview = overview
    this.poster_path = poster_path
    this.popularity = popularity
    this.tags = tags
  }

  static readAll (cb) {
    getDatabase().collection('movies').find().toArray()
      .then(movies => {
        let instances = movies.map(movie => new Movie(movie.id, movie.title, movie.overview, movie.poster_path, movie.popularity, movie.tags))
        cb(null, instances)
      })
      .catch(err => {
        cb(err, null)
      })
  }

  static create () {

  }

  static update () {

  }

  static delete () {

  }
}

module.exports = Movie;