const { ObjectId } = require('mongodb');
const { getDatabase } = require('../config/mongodb');

class Series {
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
    return getDatabase().collection('tv_series').findOneAndUpdate({ _id: ObjectId(id) }, {
      $set: updatedData}, { returnOriginal: false })
  }

  static delete (id) {
    return getDatabase().collection('tv_series').deleteOne({ _id: ObjectId(id) })
  }
}

module.exports = Series