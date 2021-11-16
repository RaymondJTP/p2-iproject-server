const bcrypt = require('bcryptjs');

function hashPassword(password){
    var salt = bcrypt.genSaltSync(10);
    return hash = bcrypt.hashSync(password, salt);
}

function comparePassword(password,hashedPassword){
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
    hashPassword,comparePassword
}