const cors = require("cors");
const error = require("../middleware/error");
const express = require("express");


//Routes
const auth = require("../routes/api/auth");
const user = require("../routes/api/user");
const service = require("../routes/api/service");


module.exports = (app) => {
    app.use(cors());
    app.use(error);
    app.use(express.json());

    app.use("/api/user", user);
    app.use("/api/service", service);
    app.use("/api/auth", auth);
}