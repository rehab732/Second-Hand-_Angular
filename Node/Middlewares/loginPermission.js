
var jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    //console.log(req.headers.authorizaion.split(" ")[1]);
    var Token = req.headers.authorizaion.split(" ")[1];
    if(!Token)  res.status(400).send("You are not Logged in...");
}