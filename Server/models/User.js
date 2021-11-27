const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength:5,
        maxlength:50,
    },
    lastName: {
        type: String,
        require: true,
        minlength:5,
        maxlength:50,
    },
    email: {
        type: String,
        required: true,
        minlength:5,
        maxlength:255,
        unique:true,
    },
    password: {
        type:String,
        required: true,
        minlength:5,
        maxlength:1024,
    },
    picture:{
        type: String,
        default: "/static/user_profile/default.png",
        minlength:5,
        maxlength:1024,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    isEmployee:{
        type:Boolean,
        default:true,
    },
    isChef:{
        type:Boolean,
        defualt:false,
    },

});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {_id: this._id, isAdmin:this.isAdmin, isChef:this.isChef},
        process.env.JWT_SECRET
    );
    return token;
};

const User = mongoose.model("User",userSchema);

const validateUser = (user) => {
    const schema = {
        firstName: Joi.string().min(5).max(50).required(),
        lastName: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(1024).required(),
    }
    return Joi.validate(user, schema);
}

module.exports = {User, validate: validateUser};