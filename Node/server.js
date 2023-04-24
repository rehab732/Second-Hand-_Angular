//#region Requires
const mongoose = require("mongoose");
const express = require("express");
const app = express();
//const cors = require('cors');
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



//#region Admin
const AdminRoutes = require("./Routes/AdminRoutes");
app.use("/api/Admins", AdminRoutes);
//#endregion

//#region Customer
const CustomerRoutes = require("./Routes/CustomerRoutes");
app.use("/api/Customers", CustomerRoutes);
//#endregion

//#region Charity
const CharityRoutes = require("./Routes/CharityRoutes");
app.use("/api/Charities", CharityRoutes);
//#endregion

//#region Product
const ProductRoutes = require("./Routes/ProductRoutes");
app.use("/api/Products", ProductRoutes);
//#endregion


//#region Order
const OrderRoutes = require("./Routes/OrderRoutes");
app.use("/api/Orders", OrderRoutes);

//#region Category
const CategoryRoutes = require("./Routes/CategoryRoutes");
app.use("/api/Catigories", CategoryRoutes);

//#endregion



//#endregion
app.listen(PORT, () => { console.log("http://localhost:" + PORT) });
