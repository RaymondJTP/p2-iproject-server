const {User} = require('../models')
const {signToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bycript')
const nodemailer = require('nodemailer');



class Controller{
    static async register(req,res,next){
        try {
            let {username,email,password,address,phoneNumber} = req.body
            const getUser = await User.findOne({
                where : {email : email}
            })
            if(getUser){
                throw ({name : 'unique'})
            }
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


            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'raymondpanjaitan11@gmail.com',
                    pass: process.env.PASS_GMAIL
                }
            });

            let mailDetails = {
                from: 'Admin Find Me App',
                to: getUser.email,
                subject: 'Login mail',
                text: 'Login information mail for FindMe App'
            };
              
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });


            res.status(200).json({message: 'Login Succes', access_token})
        } catch (err) {
            next(err)
        }
    }

    static async updateLocation (req,res,next){
        try {
            const UserId = +req.user.id

            const getUser = await User.findByPk(UserId)

            if(!getUser){
                throw({name : 'usernotfound'})
            }
            const location = {latitude : req.body.latitude, longitude : req.body.longitude}

            const result = await User.update(
                location,
                {where : {id : UserId}, returning : true}
            )

            res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller