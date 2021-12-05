const express = require("express");
const { Service, validate} = require("../../models/Service");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require("joi");
const _ = require("lodash");

router.get("/me", auth, async (req, res) => {
    const user = await Service.findById(req.service._id)
    res.json(
        _.pick(user, [
            "_id",
            "ServiceName",
            "user_id"
        ])
    );
});
const validateService = (req) => {
    const schema = {
        ServiceName: Joi.string().min(10).max(50).required(),
    };
    return Joi.validate(req,schema);
};

module.exports = router ;
