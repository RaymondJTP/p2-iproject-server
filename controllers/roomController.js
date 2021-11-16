const {User,Room,UserRoom} = require('../models')
const {comparePassword} = require('../helpers/bycript')

class Controller{
    static async getRooms(req,res,next){
        try {
            const result = await Room.findAll()
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async addRoom(req,res,next){
        try {
            const UserId = req.user.id
            const {name,member,passwordRoom} = req.body
            const result = await Room.create({
                name,member,passwordRoom,UserId
            })

            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async joinRoom(req,res,next){
        try {
            const UserId = +req.user.id
            const {passwordRoom} = req.body
            const RoomId = +req.params.id

            const getRoom = await Room.findByPk(RoomId)

            let isValid = comparePassword(passwordRoom, getRoom.passwordRoom)

            if(!isValid){
                throw ({name : 'invalidroompassword'})
            }

            const result = await UserRoom.create({
                UserId,RoomId
            })

            res.status(201).json({result, message : 'You enter this room'})
        } catch (err) {
            next(err)
        }
    }

    static async deleteRoom(req,res,next){
        try {
            const RoomId = +req.params.id
            const UserId = +req.user.id

            const result = await Room.destroy({
                where : {id : RoomId}
            })

            res.status(200).json('Delete Success')
        } catch (err) {
            
        }
    }
}

module.exports = Controller