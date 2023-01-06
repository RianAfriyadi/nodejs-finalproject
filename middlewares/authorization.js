const { verifyToken } = require("./jwt")

const authUser = async (req, res, next) => {
    const token = req.get("token")
    const userDecoded = verifyToken(token)
    if(userDecoded) {
        const { findByID } = require("../models/user-auth")
        const found = await findByID(userDecoded.id)
        if(found) {
            res.locals.user = found
            return next()
        } 
    }
    res.status(401).json({
        message: "Invalid / expired token"
    })
}

module.exports = authUser