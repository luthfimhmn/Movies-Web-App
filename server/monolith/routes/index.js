const router = require('express').Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.home);
router.get('/movies', movieController.readAll);
router.post('/movies', movieController.postAdd);


module.exports = router;