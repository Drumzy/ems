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
            "isAdmin",
            "isEmployee",
            "isChef",
        ])
    );
});

// @route POST api/user
// @desc register user
// @access Public
router.post("/", async (req, res) =>{
    console.log(req.body);
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {email, password} = req.body;

    //Checking if email does already exist
    let user = await User.findOne({email});
    if(user) return res.status(400).json({message: "User already exist"});

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({
        ...req.body,
        password:hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName
        .split(" ")
        .concat(Math.floor(Math.random() * 100))
        .join("."),
    });

    user = await user.save();

    const token = user.generateAuthToken();
    res.status(200).json({
        token,
        user: _.pick(user, [
            "_id",
            "firstName",
            "lastName",
            "email",
            "password",
            "isChef",
            "isEmployee",
            "isAdmin",
        ]),
    });
});

const validateUser = (req) => {
     const schema = {
         firstName: Joi.string().min(5).max(50).required(),
         lastName: Joi.string().min(4).max(50).required(),
         email: Joi.string().min(5).max(255).required().email(),
         password: Joi.string().min(5).max(1024).required(),
     };
     return Joi.validate(req,schema);
 };

 module.exports = router ;