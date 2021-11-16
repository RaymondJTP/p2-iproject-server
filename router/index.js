const router = require('express').Router()
const authRouter = require('./auth')
const errorHandler = require('../middlewares/errorHandler')

router.use('/', authRouter)
router.use(errorHandler)

module.exports = router