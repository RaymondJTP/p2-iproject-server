const {User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authentication = async (req,res,next) => {
    try {
        const {access_token} = req.headers

        if(!access_token){
            throw({name : 'token'})
        }

        const tokenPayLoad = verifyToken(access_token)
        if(!tokenPayLoad){
            throw ({ name : 'token'})
        }

        const getUser = await User.findOne({
            where : {email : tokenPayLoad.email}
        })

        if(!getUser){
            throw({name : 'token'})
        }

        req.user = {
            id : getUser.id,
            email : getUser.email
        }

        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {authentication}