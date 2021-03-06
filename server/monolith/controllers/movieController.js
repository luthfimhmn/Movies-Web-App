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
    Movie.create(newMovie)
      .then(data => res.status(201).json(data))
      .catch(err => next(err))
  }

  static getById (req, res, next) {
    Movie.getById(req.params.id)
      .then(movie => res.status(200).json(movie))
      .catch(err => next(err))
  }

  static update (req, res, next) {
    const id = req.params.id
    const updatedData = req.body
    Movie.update(id, updatedData)
      .then(result => res.status(200).json(result))
      .catch(err => next(err))
  }

  static getDelete (req, res, next) {
    const id = req.params.id
    Movie.delete(id)
      .then(data => {
        res.status(200).json({message: 'success delete data' , data})})
      .catch(err => next(err))
  }
}

module.exports = MovieController