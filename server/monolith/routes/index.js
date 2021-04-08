const router = require('express').Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.home);
router.get('/movies', movieController.readAll);


module.exports = router;