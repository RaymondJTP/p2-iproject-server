const router = require('express').Router()
const authRouter = require('./auth')
const roomRouter = require('./rooms')
const errorHandler = require('../middlewares/errorHandler')
const {authentication} = require('../middlewares/authentication')

router.use('/', authRouter)
router.use(authentication)
router.use('/rooms', roomRouter )
router.use(errorHandler)

module.exports = router