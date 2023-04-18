//#region Requires
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT||7010;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//#endregion


mongoose.connect("mongodb+srv://hassanelfalt60:3xdna2RJcCLZ7Vgd@cluster0.sixirhw.mongodb.net/SecondHand");

//#region End Points 


//#region Admin
    const AdminRoutes = require("./Routes/AdminRoutes");
    app.use("/api/Admins",AdminRoutes);
//#endregion

//#region Customer
    const CustomerRoutes = require("./Routes/CustomerRoutes");
    app.use("/api/Customers",CustomerRoutes);
//#endregion



//#endregion
app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)});
