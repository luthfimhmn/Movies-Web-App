const Tvseries = require('../models/Tvseries');

class TvseriesController {
  static readAll (req, res, next) {
    Tvseries.readAll()
      .then(tvseries => res.status(200).json(tvseries))
      .catch(err => next(err))
  }

  static create (req, res, next ) {
    const { title, overview, poster_path, popularity, tags} = req.body
    const newTvSeries = {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    Tvseries.create(newTvSeries)
      .then(data => res.status(201).json(data))
      .catch(err => next(err))
  }

  static getById (req, res, next) {
    const id = req.params.id
    Tvseries.getById(id)
      .then(tvseries => res.status(200).json(tvseries))
      .catch(err => next(err))
  }

  static update (req, res, next ) {
    const id = req.params.id
    const updatedData = req.body
    Tvseries.update(id, updatedData)
      .then(result => res.status(200).json(result))
      .catch(err => next(err))
  }

  static getDelete (req, res, next) {
    const id = req.params.id
    Tvseries.delete(id)
      .then(data => res.status(200).json({ message: 'success delete tv series'}))
      .catch(err => next(err))
  }
}

module.exports = TvseriesController