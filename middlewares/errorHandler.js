const errorHandler = (err,req,res,next) => {
    console.log(err);
    // res.status(400).json(err)
    if(err.name == 'SequelizeValidationError'){
        res.status(400).json({message : err.errors[0].message})
    }
    else if(err.name == 'unique'){
        res.status(401).json({message : 'Email has been registered'})
    }
    else if(err.name == 'invalidroompassword'){
        res.status(401).json({message : 'You cant join this room'})
    }
    else if(err.name == 'invalid'){
        res.status(401).json({message : 'Invalid email/password'})
    }
    else if(err.name == 'token' || err.name == 'JsonWebTokenError'){
        res.status(401).json({message : 'Invalid token'})
    }
    else if(err.name == 'notfound'){
        res.status(401).json({message : 'Room not found'})
    }
    else if(err.name == 'unauthorized'){
        res.status(403).json({message : 'You dont have authorized'})
    }
    else {
        console.log(err.message);
    }
}

module.exports = errorHandler