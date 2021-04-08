const SeriesController = require('../controllers/SeriesController');
const router = require('express').Router();

router.get('/', SeriesController.readAll);
router.post('/', SeriesController.create);
router.get('/:id', SeriesController.getById);
router.put('/:id', SeriesController.update);
router.delete('/:id', SeriesController.delete);

module.exports = router;