const Series = require('../models/Series');

class SeriesController {
  static readAll (req, res, next) {
    Series.readAll()
      .then(series => res.status(200).json(series))
      .catch(err => next(err))
  }

  static create (req, res, next ) {
    const { title, overview, poster_path, popularity, tags} = req.body
    const newSeries = {
      title,
      overview,
      poster_path,
      popularity,
      tags
    }
    Series.create(newSeries)
      .then(data => res.status(201).json(data.ops[0]))
      .catch(err => next(err))
  }

  static getById (req, res, next) {
    const id = req.params.id
    Series.getById(id)
      .then(series => res.status(200).json(series))
      .catch(err => next(err))
  }

  static update (req, res, next ) {
    const id = req.params.id
    const updatedData = req.body
    Series.update(id, updatedData)
      .then(result => res.status(200).json(result.value))
      .catch(err => next(err))
  }

  static delete (req, res, next) {
    const id = req.params.id
    Series.delete(id)
      .then(data => res.status(200).json({ message: 'success delete tv series'}))
      .catch(err => next(err))
  }
}

module.exports = SeriesController