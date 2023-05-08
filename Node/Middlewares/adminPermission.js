var jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    //console.log(req.headers.authorizaion.split(" ")[1]);
    var Token = req.headers.authorizaion.split(" ")[1]; //localStorage.getItem("UserToken");
    if(!Token)  res.status(400).send("You are not Logged in...");

    var decodePayload = jwt.verify(Token, process.env.JWTSecret);
    if(decodePayload.isAdmin){
        next()
    }else{
        return res.status(401).send("You are not authorized to access this page...");
    }
}