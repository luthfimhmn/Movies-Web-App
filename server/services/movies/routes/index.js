const router = require('express').Router();
const MovieController = require('../controllers/MovieController');

router.get('/', MovieController.readAll);
router.post('/', MovieController.create);
router.get('/:id', MovieController.getById);
router.put('/:id', MovieController.update);
router.delete('/:id', MovieController.delete);

module.exports = router;