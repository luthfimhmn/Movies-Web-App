const router = require('express').Router();
const movieController = require('../controllers/movieController');
const movieRoute = require('./movieRoute');
const tvseriesRoute = require('./tvseriesRoute');

router.get('/', movieController.home);
router.use('/movies', movieRoute );
router.use('/tvseries', tvseriesRoute);

module.exports = router;