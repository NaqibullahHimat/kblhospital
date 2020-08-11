const express = require('express')
const router = express.Router();
const {Doctor} = require('../models/doctor')
const {Hospital} = require('../models/hospital')

router.get("/", async (req, res) => {
    let str = req.query.q;
    console.log("searching for ", str);

    let doctors = await Doctor.find({ name: { $regex: str, $options: "i" }});
    console.log("doctors =", doctors)
    let hospitals = await Hospital.find({ name: { $regex: str, $options: "i" }});
    console.log("hospitals =", hospitals)
    const result = [...doctors, ...hospitals]
    console.log('cobined = ' , result);
    res.send({output: result});
})


module.exports = router;