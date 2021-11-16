const {User,UserRoom,Room} = require('../models')

const authorization = async (req,res,next) => {
    try {
        const UserId = +req.user.id
        const RoomId = +req.params.id

        const getRoom = await Room.findByPk(RoomId)
        if(!getRoom){
            throw ({name : 'notfound'})
        }

        if(getRoom.UserId !== UserId ){
            throw({name : 'unauthorized'})
        }

        next()
    } catch (err) {
        next(err)   
    }
}

module.exports = authorization