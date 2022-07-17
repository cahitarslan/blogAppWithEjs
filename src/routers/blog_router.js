const router = require('express').Router();
const blogController = require('../controllers/blog_controller');

router.post('/', blogController.aramaYap);

router.get('/blog', blogController.tumMakaleleriGetir);
router.get('/:makaleID', blogController.tekMakaleGetir);
router.get('/', blogController.tumMakaleleriGetir);

module.exports = router;
