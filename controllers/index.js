var router = require('express').Router();

// split up route handling
router.use('/applicant', require('./applicant'))
router.use('/application', require('./application'))
router.use('/staff', require('./staff'))

module.exports = router;