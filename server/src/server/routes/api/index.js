const router = require('express').Router();

router.use('/detect', require('./detect'));

module.exports = router;
