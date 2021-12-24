const express = require("express");
const {Notice,validate} = require("../../models/Notice");
const auth = require("../../middleware/auth");
const Joi = require("joi");
const mongoose = require("mongoose");
const router = express.Router();


router.get("/all", auth, async (req,res) =>{
    let notices = await Notice.find().populate(
        {
            path:'Employee',
            select:'-password',
        });
    if(!notices) return res.status(400).json({message: "No Notices found"});

    return res.status(200).json(notices);
});

router.post("/notice_demande", async (req,res)=>{
    console.log(req.body);
    let notice = await Notice.findOne({Employee : req.body.Employee_id});

    if(notice) return res.status(400).json({message: "You already requested a notice "});

    notice = new Notice({
        ...req.body,
        Employee: new mongoose.Types.ObjectId(req.body.Employee_id),
        StartDate: req.body.StartDate,
        Duration: req.body.Duration,
        FinishDate : req.body.FinishDate
    });
    notice = await notice.save();
    return res.status(200).json({message : "Notice Added"});
});

const validateNotice = (req) =>{
    const schema = {
        StartDate: Joi.date().required(),
        Duration: Joi.number().required(),
        FinishDate: Joi.date().required(),
    }
    return Joi.validate(req,schema);
};

module.exports = router ;