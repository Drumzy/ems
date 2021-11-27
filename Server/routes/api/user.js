const express = require("express");
const { User, validate} = require("../../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

// @route GET api/user/me
// @desc user info
// @access private
router.get("/me", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password")
    res.json(
        _.pick(user, [
            "_id",
            "firstName",
            "lastName",
            "email",
        ])
    );
});

const validateUser = (req) => {
     const schema = {
         firstName: Joi.string().min(5).max(50).required(),
         lastName: Joi.string().min(5).max(50).required(),
         email: Joi.string().min(5).max(255).required().email(),
         password: Joi.string().min(5).max(1024).required(),
     };
     return Joi.validate(req,schema);
 };

 module.exports = router ;