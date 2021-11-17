const {User} = require('../models')
const {signToken} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bycript')
const nodemailer = require('nodemailer');
const {OAuth2Client} = require('google-auth-library');
const jwt = require('jsonwebtoken');


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
                text: `Login information mail for FindMe App, , please kindly reply if it's not you`
            };
              
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });


            res.status(200).json({message: 'Login Succes',id : getUser.id, access_token})
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

    static async google(req,res,next){
        console.log('asuuup');
        try {
            const {id_token} = req.body
            const client_id = process.env.GOOGLEID
            const client = new OAuth2Client(client_id);
           

            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: client_id, 
            });
            const payload = ticket.getPayload()
            const {email} = payload
            console.log(email);


            const [user, isCreated] = await User.findOrCreate({
                where : {
                    email : email
                },
                defaults : {
                    username : 'userstaff',
                    password : 'afasf9ade3afa',
                    address : 'Indonesia',
                    phoneNumber : '081941845871'
                }
            })


            let status = 200
            if(isCreated){
                status = 201
            }
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'raymondpanjaitan11@gmail.com',
                    pass: process.env.PASS_GMAIL
                }
            });

            let mailDetails = {
                from: 'Admin Find Me App',
                to: email,
                subject: 'Login mail',
                text: `Login information mail for FindMe App, please kindly reply if it's not you`
            };
              
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent successfully');
                }
            });
            const access_token = jwt.sign({ id : user.id, email : user.email}, process.env.JWTGOOGLE)
            res.status(status).json({access_token})

        } catch (err) {
            console.log(err.message);
            next(err)
        }
    }

}

module.exports = Controller