require("dotenv").config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token');
    if(token){
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        console.log(req.user)
    }else{
        return res.status(400).json({error:"You are not authorized in fetchUser"});
    }
    next();
}
module.exports = fetchUser;