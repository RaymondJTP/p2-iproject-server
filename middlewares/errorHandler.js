const errorHandler = (err,req,res,next) => {
    console.log(err);
    // res.status(400).json(err)
    if(err.name == 'SequelizeValidationError'){
        res.status(400).json({message : err.errors[0].message})
    }else if(err.name == 'token'){
        res.status(401).json({message : 'Invalid token'})
    }
}

module.exports = errorHandler