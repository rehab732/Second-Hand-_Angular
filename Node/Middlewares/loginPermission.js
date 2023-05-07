
var jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    // console.log(req.headers);
    
    var Token = req.headers.authorizaion.split(" ")[1];
//    console.log("Token: " + Token);
    if(Token && Token != "null"){
        console.log("Token: " + Token);
        next();
    }else{
        return res.status(400).send("You are not Logged in...");
    }


}