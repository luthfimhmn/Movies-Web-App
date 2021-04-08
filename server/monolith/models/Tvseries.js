const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongodb');

class Tvseries {
  constructor (title, overview, poster_path, popularity, tags) {
    this.title = title
    this.overview = overview
    this.poster_path = poster_path
    this.popularity = popularity
    this.tags = tags
  }

  static readAll () {
    return getDatabase().collection('tv_series').find().toArray()
  }

  static create (newTvSeries) {
    return getDatabase().collection('tv_series').insertOne(newTvSeries)
  }

  static getById (id) {
    return getDatabase().collection('tv_series').findOne({ _id: ObjectId(id) })
  }

  static update (id, updatedData) {
    return getDatabase().collection('tv_series').updateOne({ _id: ObjectId(id) }, {
      $set: updatedData
    })
  }

  static delete (id) {
    return getDatabase().collection('tv_series').deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = Tvseries