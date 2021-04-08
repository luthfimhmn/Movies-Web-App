const Movie = require('../models/Movie');


class MovieController {
  static home (req, res ,next) {
    res.status(200).json({message: 'Ini halaman home'})
  }

  static readAll (req, res, next) {
    Movie.readAll()
      .then(movies => res.status(200).json(movies))
      .catch(err => next(err))
  }

  static postAdd (req, res, next) {
    const { title, overview, poster_path, popularity, tags} = req.body
    const newMovie = {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    Movie.create(newMovie, (err, data) => {
      if(err) {
        next(err)
      } else {
        res.status(201).json(data)
      }
    })
  }

  static getEdit () {

  }

  static postEdit () {

  }

  static getDelete (req, res, next) {
    const id = req.params.id
    Movie.delete(id, (err,data) => {
      if(err){
        next(err)
      } else {
        res.status(200).json(data)
      }
    })
  }
}

module.exports = MovieController