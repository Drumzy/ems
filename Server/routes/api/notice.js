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
    let notice = await Notice.findOne({Employee : req.body.Employee_id});

    if(notice) return res.status(400).json({message: "You already requested a notice "});

    notice = new Notice({
        ...req.body,
        Employee: req.body.Employee_id,
        StartDate: req.body.StartDate,
        Duration: req.body.Duration,
        FinishDate : req.body.FinishDate,
        Status : req.body.Status,
    });
    console.log(notice);
    notice = await notice.save();
    return res.status(200).json({message : "Notice Added"});
});

router.post("/accept_notice",async (req,res) =>{
    let notice = await Notice.findByIdAndUpdate(req.body.NoticeId,{Status:'Accepted'});

    if(!notice) return res.status(400).json({message: "Error while updating the notice"});

    return res.status(200).json({message : "Notice Status Updated"});
});

router.post("/deny_notice",async (req,res) =>{
    let notice = await Notice.findByIdAndUpdate(req.body.NoticeId,{Status:"Denied"});

    if(!notice) return res.status(400).json({message:"Error while updating notice status"});

    return res.status(200).json({message:"Notice Status Updated "}) ;
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