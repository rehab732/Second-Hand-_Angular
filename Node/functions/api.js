const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
//#region Requires
require("dotenv").config();
const mongoose = require("mongoose");
// const express = require("express");
// const app = express();
//const cors = require('cors');
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 7010;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//#endregion
const root = "/.netlify/functions/api"
mongoose.connect("mongodb+srv://hassanelfalt60:3xdna2RJcCLZ7Vgd@cluster0.sixirhw.mongodb.net/SecondHand");
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorizaion"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS, PATCH"
    );
    next();
});
//#region Admin
const AdminRoutes = require("../Routes/AdminRoutes");
app.use(root + "/Admins", AdminRoutes);
//#endregion
//#region Customer
const CustomerRoutes = require("../Routes/CustomerRoutes");
app.use(root + "/Customers", CustomerRoutes);
//#endregion
//#region Charity
const CharityRoutes = require("../Routes/CharityRoutes");
app.use(root + "/Charities", CharityRoutes);
//#endregion
//#region Product
const ProductRoutes = require("../Routes/ProductRoutes");
app.use(root + "/Products", ProductRoutes);
//#endregion
//#region Order
const OrderRoutes = require("../Routes/OrderRoutes");
app.use(root + "/Orders", OrderRoutes);
//#region Category
const CategoryRoutes = require("../Routes/CategoryRoutes");
app.use(root + "/Catigories", CategoryRoutes);
//#endregion
//Get all students
router.get('/', (req, res) => {
    res.send('App is running..');
});
app.use('/api', router);
module.exports.handler = serverless(app);