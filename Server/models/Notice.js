const mongoose = require("mongoose");
const Joi = require("joi");

const noticeSchema = new mongoose.Schema({
    Employee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    StartDate:{
        type:Date,
        required:true,
    },
    Duration:{
        type:Number,
        required:true,
    },
    FinishDate:{
        type:Date,
        required:true,
    },
});

const Notice = mongoose.model("Notice",noticeSchema);

const validateNotice = (Notice) =>{
    const schema = {
        StartDate: Joi.date().required(),
        Duration: Joi.number().required(),
        FinishDate: Joi.date().required(),
    }
    return Joi.validate(Notice,schema);
}
module.exports = {Notice, validate:validateNotice};