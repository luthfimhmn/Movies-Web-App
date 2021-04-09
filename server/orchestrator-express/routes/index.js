const router = require('express').Router();
const Controller = require('../controllers/index');

router.get('/movies', Controller.getAllMovies);
router.get('/series', Controller.getAllSeries);


module.exports = router;