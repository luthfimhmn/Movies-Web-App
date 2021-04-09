const router = require('express').Router();
const Controller = require('../controllers/index');

router.get('/movies', Controller.getAllMovies);
router.get('/series', Controller.getAllSeries);
router.post('/movies', Controller.addMovie);
router.post('/series', Controller.addSeries);
router.delete('/movies/:id', Controller.deleteMovie);
router.delete('/series/:id', Controller.deleteSeries);
router.get('/movies/:id', Controller.getMovieById);
router.get('/series/:id', Controller.getSeriesById);

module.exports = router;