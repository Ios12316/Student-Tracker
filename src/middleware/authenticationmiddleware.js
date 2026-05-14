const Jwt = require('jsonwebtoken')
const Student = require('../models/Student')

const secret = process.env.JWT_SECRET

const authenticationMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token) return res.status(404).json({message: 'Not found'})
            const decoded = Jwt.verify(token, secret)
        if(!decoded) return res.status(401).json({message: 'Invalid Token'})
            req.user = await Student.findById(decoded.id).select('password')
        if(!req.user) return res.status(401).json({message: 'User not found'})
            next()

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
module.exports = authenticationMiddleware;
