const express = require("express");
const app = express();
const adminController = require("../controllers/adminController");

app.get("/getAllInterviews", (req, res, next) => {
    adminController.getAllInterviews(req, res, next);
});

app.post("/scheduleInterview", (req, res, next) => {
    adminController.scheduleInterview(req, res, next);
});

app.put("/updateInterview", (req, res, next) => {
    adminController.updateInterview(req, res, next);
});

app.delete("/deleteInterview", (req, res, next) => {
    adminController.deleteInterview(req, res, next);
});

app.get("/user/:id", (req, res, next) => {
    adminController.getUser(req, res, next);
});

app.get("/getAllUsers", (req, res, next) => {
    adminController.getAllUsers(req, res, next);
});

app.post("/addUser", (req, res, next) => {
    adminController.addUser(req, res, next);
});

module.exports = app;