//#region Requires
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT||7010;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//#endregion


//#region End Points 

//#region Doctor
    const AdminRoutes = require("./Routes/AdminRoutes");
    app.use("/api/Admins",AdminRoutes);
//#endregion

//#region Patient
    const CustomerRoutes = require("./Routes/CustomerRoutes");
    app.use("/api/Customers",CustomerRoutes);
//#endregion



//#endregion
app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)});
