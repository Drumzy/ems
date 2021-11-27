const express = require("express");
const { User } = require("../../models/User");
 const bcrypt = require("bcryptjs");
 const Joi = require("joi");
 const router = express.Router();


 // @route GET
 // @desc Login User
 // @access Public
 router.post("/",async (req, user) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    const {email,password} = req.body;

    //Checking if the user exist 
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "Invalid Email"});

    //Validating password
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword)
    return res.status(400).json({message: "Invalid Password"});

    const token = user.generateAuthToken();
    res.json({token});
 });

 const validate = (req) => {
     const schema = {
         email: Joi.string().min(5).max(255).required().email(),
         password: Joi.string().min(5).max(1024).required(),
     };
     return Joi.validate(req,schema);
 }

 module.exports = router ;