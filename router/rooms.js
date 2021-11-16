const router = require('express').Router()
const authController = require('../controllers/authController')

router.get('/', authController.register)
router.post('/', authController.login)


module.exports = router