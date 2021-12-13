const express = require("express");
const { Service, validate} = require("../../models/Service");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");

router.get("/all", auth, async (req, res) => {
    const service = await Service.find();
    let result = service ;
    res.status(200).json(result);
});
router.post("/add_service",auth, async (req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details);
    const ServiceName = req.body.ServiceName;
    let service = await Service.findOne({ ServiceName });
    if(service) return res.status(400).json({message: "Service already Exist"});

    service = new Service({
        ...req.body,
        ServiceName: req.body.ServiceName,
        ServiceChef: null,
        EmployeeNumber: 0
    });
    service = await service.save();
    return res.status(200).json({message: "Added"});
});
router.post("/update_service", auth, async (req, res) =>{
    const filter = {_id: req.body._id};
    const update = {ServiceName : req.body.ServiceName};
    
    let service = await Service.findOneAndUpdate(filter,update,{
        new:true
    });
    if(!service) return res.status(400).json({message:"Error While Updating Service"});

    return res.status(200).json({message:"Service Updated"});
});
router.post("/delete_service",auth, async (req, res)=>{
    const filter = {_id : req.body._id};
    let service = await Service.findOneAndDelete(filter);
    if(!service) return res.status(500).json({message: "Error while deleting service"});
    return res.status(200).json({message: "Service Deleted"});
})
const validateService = (req) => {
    const schema = {
        ServiceName: Joi.string().min(5).max(50).required(),
    };
    return Joi.validate(req,schema);
};

module.exports = router ;
