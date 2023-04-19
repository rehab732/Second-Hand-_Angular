//#region Requires
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 7010;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//#endregion


mongoose.connect("mongodb+srv://hassanelfalt60:3xdna2RJcCLZ7Vgd@cluster0.sixirhw.mongodb.net/SecondHand");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});


//#region End Points 
/*
app.use(cors({
    origin: true, // "true" will copy the domain of the request back
                  // to the reply. If you need more control than this
                  // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
                       // authenticated via either a session cookie
                       // or Authorization header. Otherwise the
                       // browser will block the response.

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Make sure you're not blocking
                                           // pre-flight OPTIONS requests
}));*/
/*
app.use(function(req, res, next) {
    console.log("MiddleWare")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
  });*/
//#region Admin
const AdminRoutes = require("./Routes/AdminRoutes");
app.use("/api/Admins", AdminRoutes);
//#endregion

//#region Customer
const CustomerRoutes = require("./Routes/CustomerRoutes");
app.use("/api/Customers", CustomerRoutes);
//#endregion



//#endregion
app.listen(PORT, () => { console.log("http://localhost:" + PORT) });
