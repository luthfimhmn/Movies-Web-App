const axios = require("axios")
const Redis = require('ioredis');
const redis = new Redis()
const baseURLMovies = 'http://localhost:3000/'
const baseURLSeries = 'http://localhost:3002/'

class Controller {

  static async getAllMovies (req, res, next) {
    try {
      const moviesData = await redis.get('movies:data')
      if (!moviesData) {
        console.log('masuk belum di cache')
        const { data } = await axios.get(baseURLMovies)
        await redis.set('movies:data', JSON.stringify(data))
        res.status(200).json(data)
      } else {
        console.log('Sudah di cache');
        res.status(200).json(JSON.parse(moviesData))
      }
    } catch(err) {
      console.log(err)
      next(err)
    }
  }

  static getAllSeries (req, res, next) {
    axios.get(baseURLSeries)
      .then(response => {
        res.status(200).json(response.data)
      })
      .catch(err => next(err))
  }
}

module.exports = Controller