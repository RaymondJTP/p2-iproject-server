const {User} = require('../models')
const {signToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bycript')


class Controller{
    static async register(req,res,next){
        try {
            let {username,email,password,address,phoneNumber} = req.body

            const result = await User.create({
                username,email,password,address,phoneNumber
            })

            res.status(201).json(result)
            
        } catch (err) {
            next(err)
        }
    }

    static async login(req,res,next){
        try {
            const {email,password} = req.body

            const getUser = await User.findOne({
                where : {email : email}
            })

            if(!getUser){
                throw ({name : 'invalid'})
            }

            let isValid = comparePassword(password,getUser.password)

            if(!isValid){
                throw ({name : 'invalid'})
            }
            let tokenPayLoad = {id : getUser.id, email: getUser.email}
            let access_token = signToken(tokenPayLoad)

            res.status(200).json({message: 'Login Succes', access_token})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller