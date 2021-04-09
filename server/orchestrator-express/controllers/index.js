const axios = require("axios")
const Redis = require('ioredis')
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
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async getAllSeries (req, res, next) {
    try {
      const seriesData = await redis.get('series:data')
      if (!seriesData) {
        console.log('masuk belum di cache')
        const { data } = await axios.get(baseURLSeries)
        await redis.set('series:data', JSON.stringify(data))
        res.status(200).json(JSON.parse(seriesData))
      } else {
        console.log('Sudah di cache');
        res.status(200).json(JSON.parse(seriesData))
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async addMovie (req, res, next) {
    try {
      await redis.del('movies:data')
      const newMovie = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
      const { data } = await axios.post(baseURLMovies, newMovie)
      res.status(201).json(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async addSeries (req, res, next) {
    try {
      await redis.del('series:data')
      const newSeries = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        popularity: req.body.popularity,
        tags: req.body.tags
      }
      const { data } = await axios.post(baseURLSeries, newSeries)
      res.status(201).json(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async getMovieById (req, res, next) {
    try {
      const id = req.params.id
      await redis.del('movies:data')
      const { data } = await axios.get(baseURLMovies + id)
      res.status(200).json(data)
     } catch (err) {
       console.log(err)
       next(err)
     }
  }

  static async getSeriesById (req, res, next) {
    try {
      const id = req.params.id
      await redis.del('series:data')
      const { data } = await axios.get(baseURLSeries + id)
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async updateMovie (req, res, next) {
    try {
      const id = req.params.id
      await redis.del('movies:data')
      const { data } = axios.put( baseURLMovies + id )
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async deleteMovie (req, res, next) {
    try {
      const id = req.params.id
      await redis.del('movies:data')
      const { data } = await axios.delete( baseURLMovies + id )
      res.status(200).json(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async deleteSeries (req, res, next) {
    try {
      const id = req.params.id
      await redis.del('series:data')
      const { data } = await axios.delete( baseURLSeries + id )
      res.staus(200).json(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = Controller