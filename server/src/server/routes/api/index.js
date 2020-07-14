const router = require('express').Router();

router.use('/detect', require('./detect'));
router.use('/image', require('./image'));

module.exports = router;
