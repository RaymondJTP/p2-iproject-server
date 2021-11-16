const router = require('express').Router()
const roomController = require('../controllers/roomController')
const authorization = require('../middlewares/authorization')

router.get('/', roomController.getRooms)
router.post('/', roomController.addRoom)
router.post('/:id', roomController.joinRoom)
router.delete('/:id', authorization, roomController.deleteRoom)


module.exports = router