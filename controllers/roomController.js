const {User,Room,UserRoom} = require('../models')
const {comparePassword} = require('../helpers/bycript')
const axios = require('axios')

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
            console.log(passwordRoom, 'ini password roomnya');
            const checkUser = await UserRoom.findOne({
                where : {UserId,RoomId}
            })
            const getRoom = await Room.findByPk(RoomId)
            
            let isValid = comparePassword(passwordRoom, getRoom.passwordRoom)
            
            if(!isValid){
                throw ({name : 'invalidroompassword'})
            }
            if(checkUser){
                res.status(200).json({result : checkUser, message : 'You enter this room'})
                return 
            }

            const result = await UserRoom.create({
                UserId,RoomId
            })

            res.status(201).json({result, message : 'You enter this room'})
        } catch (err) {
            next(err)
        }
    }

    static async getUserRoom(req,res,next){
        try {
            const RoomId = req.params.id
            let result = await UserRoom.findAll({
                where : {RoomId : RoomId},
                include : User
            })
            // let location = ''
            
            // console.log(weather.data.data[0]);
            for(let i = 0; i < result.length; i++){
                let weather = await axios({
                    method : 'GET',
                    url : `https://api.weatherbit.io/v2.0/current?lat=${result[i].User.latitude}&lon=${result[i].User.longitude}&key=aa901ff9d89c451fa8ce9fc54b2b94cf&include=minutely`
                })    
                result[i].setDataValue('Weather', weather.data.data[0])
            }
            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async deleteRoom(req,res,next){
        try {
            const RoomId = +req.params.id
            const UserId = +req.user.id

            const result = await Room.destroy({
                where : {id : RoomId},
                returning : true
            })

            res.status(200).json('Delete Success')
        } catch (err) {
            
        }
    }

    static async leaveRoom(req,res,next){
        try {
            const RoomId = +req.params.id
            const UserId = +req.user.id

            const result = await UserRoom.destroy({
                where : {
                    RoomId : RoomId,
                    UserId : UserId
                },
                returning : true
            })

            res.status(200).json('Success Leave Room')
        } catch (err) {
            
        }
    }
}

module.exports = Controller