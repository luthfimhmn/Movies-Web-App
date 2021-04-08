const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongodb');

class Movie {
  static readAll () {
    return getDatabase().collection('movies').find().toArray()
  }

  static create (newTvSeries) {
    return getDatabase().collection('movies').insertOne(newTvSeries)
  }

  static getById (id) {
    return getDatabase().collection('movies').findOne({ _id: ObjectId(id) })
  }

  static update (id, updatedData) {
    return getDatabase().collection('movies').updateOne({ _id: ObjectId(id) }, {
      $set: updatedData
    })
  }

  static delete (id) {
    return getDatabase().collection('movies').deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = Movie