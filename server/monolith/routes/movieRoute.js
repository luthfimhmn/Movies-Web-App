const router = require('express').Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.readAll);
router.post('/', movieController.postAdd);
router.get('/:id', movieController.getById);
router.put('/:id', movieController.update);
router.delete('/:id', movieController.getDelete);


module.exports = router