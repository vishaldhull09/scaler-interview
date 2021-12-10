const express = require("express");
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const morgan = require("morgan");

const dbConnection = require("./src/utils/dbConnection.js");
const adminRoutes = require("./src/routes/adminRoutes.js")
const app = express();

app.use(express.json());        //for parsing application/json
app.use(express.urlencoded({    //for parsing application/x-www-form-urlencoded
    "extended": true
}));
app.use(morgan("tiny"));

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "*");

    next();
});

app.options("*", (req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "*");
    res.json({ success: true });
});

app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
    res.send("We are on homepage ");
});

module.exports = app;
