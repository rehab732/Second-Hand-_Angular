var jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    var Token = localStorage.getItem("UserToken");
    if(!Token)  res.status(400).send("Access Denied...");

    var decodePayload = jwt.verify(Token, process.env.JWTSecret);
    if(decodePayload.isAdmin){
        next()
    }else{
        return res.status(401);
    }
}