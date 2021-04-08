const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongodb');
// const MovieTable = getDatabase().collection('movies');

class Movie {
  constructor (id, title, overview, poster_path, popularity, tags){
    this.id = id
    this.title = title
    this.overview = overview
    this.poster_path = poster_path
    this.popularity = popularity
    this.tags = tags
  }

  static readAll () {
     return getDatabase().collection('movies').find().toArray()
  }

  static create (newMovie) {
    return getDatabase().collection('movies').insertOne(newMovie)
  }

  static getById (id) {
    return getDatabase().collection('movies').findOne({ _id: ObjectId(id) })
  }

  static update (id, updatedData) {
    return getDatabase().collection('movies').updateOne({ _id: ObjectId(id) }, {
      $set : updatedData
    })
  }

  static delete (id) {
    return getDatabase().collection('movies').deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = Movie;