const router = require('express').Router()
const roomController = require('../controllers/roomController')
const authorization = require('../middlewares/authorization')

router.get('/', roomController.getRooms)
router.post('/', roomController.addRoom)
router.post('/:id', roomController.joinRoom)
router.delete('/:id', authorization, roomController.deleteRoom)
router.get('/room/:id', roomController.getUserRoom)


module.exports = router