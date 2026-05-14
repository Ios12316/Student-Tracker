const Jwt = require('jsonwebtoken');


const generateToken = async (studentId) => {
    const token = Jwt.sign({id: studentId}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return token;
}
module.exports = generateToken;