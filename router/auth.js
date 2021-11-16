const router = require('express').Router()
const authController = require('../controllers/authController')
const {authentication} = require('../middlewares/authentication')


router.post('/register', authController.register)
router.post('/login', authController.login)

router.use(authentication)
router.put('/updatelocation', authController.updateLocation)


module.exports = router