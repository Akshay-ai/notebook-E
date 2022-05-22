const jwt = require('jsonwebtoken');
const jwtSecret = "asdfghjkl;";

var fetchUser = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).json({error : "please authenticate yourself"});
    }
    try {
        const data = jwt.verify(token,jwtSecret);
        console.log("Data : ", data);
        req.user = data.user;
        next(); 
    }
    catch(error) {
        res.status(401).json({error : "please authenticate using valid token"});
    }
}

module.exports = fetchUser;