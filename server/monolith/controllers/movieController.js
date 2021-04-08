const Movie = require('../models/Movie');


class MovieController {
  static home (req,res ,next) {
    res.status(200).json({message: 'Ini halaman home'})
  }

  static readAll (req, res, next) {
    Movie.readAll((err, data) => {
      if(err){
        next(err)
      } else {
        res.status(200).json({data})
      }
    })
  }

  static getAdd ( ) {

  }

  static postAdd () {

  }

  static getEdit () {

  }

  static postEdit () {

  }

  static getDelete () {

  }
}

module.exports = MovieController