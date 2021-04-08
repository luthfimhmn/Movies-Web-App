const router = require('express').Router();
const tvseriesController = require('../controllers/tvseriesController');

router.get('/', tvseriesController.readAll);
router.post('/', tvseriesController.create);
router.get('/:id', tvseriesController.getById);
router.put('/:id', tvseriesController.update);
router.delete('/:id', tvseriesController.getDelete);

module.exports = router