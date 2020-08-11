const express = require('express')
const router = express.Router();
const path = require('path');
const db = require('../_helpers/db');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Hospital} = require('../models/hospital');
const {renameFile, deleteFile} = require('./FileHelpers');

// list of hospitals
router.get("/", async (req, res) => {
  const {city} = req.query;
  let hos= null;
  if (city)
    hos = await Hospital.find({city : city});
  else
  hos = await Hospital.find();

  res.send(hos);
});


  router.get("/:id", async (req, res) => {
    const hos = await Hospital.findById(req.params.id);
    if (hos) {
        res.send(hos);
    }
    else {
        res.send("Hospital not found");
    }
})

router.get("/:city", async (req, res) => {
  const hos = await Hospital.find({ city: req.params.city });
  if (hos) {
      res.send(hos);
  }
  else {
      res.send("Hospital not found");
  }
})


var multer = require("multer");
var folderName = __dirname + "/../public/images";
var upload = multer({ dest: folderName });

  router.post("/", upload.array('file'), async (req, res) => {
    // console.log(req.body, req.files);
    console.log(req.body);
  
    console.log('1. Files saved successfully');
    let { hosEmail, hosPassword, ...hospital } = req.body;
    
    const hosExist = await Hospital.findOne({hosEmail: req.body.hosEmail});
    if(hosExist) {
      console.log("Hospital already exists");
      deleteFile(req.files);
      res.status(409)
        .send({field: {name : 'hosEmail', message: "Hospital alreaday exists"}});
        return;
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(hosPassword, salt);
    const newHospital = await new Hospital(req.body).save();
  
    console.log('2. Hospital Data saved successfully');
  
    const {_id: newHospitalId} = newHospital;
  
    const profilePicName = newHospitalId + path.extname(req.files[0].originalname);
    renameFile(req.files[0], profilePicName);
    
    await Hospital.findByIdAndUpdate(newHospitalId, 
        { hosImage: 'images/' + profilePicName});
  
    console.log('3. Hospital Files renamed and Fields updated successfully');
    const account = await db.Account({
      email:hosEmail,
    passwordHash: password,
    title: "Hospital",
    firstName: req.body.name,
    lastName: " ",
    acceptTerms: true,
    role: "User",
    created: new Date(),
    isVerified: false,
    hospitalId: newHospitalId
    }).save();
  
    console.log('4. Account Info for Hospital saved successfully');
    console.log('=> Hospital Registered Successfully.');
    res.status(200).send('Hospital Registered Successfully.');
  });

  router.put("/update/:_id", async (req, res) => {
    const hos = await Hospital.updateOne({ _id: req.params._id }, req.body);
    if (hos) res.send(hos);
    else res.send("Couldn't update the credential");
  });

  router.delete("/:id", async (req, res) => {
    const hos = await Hospital.findByIdAndDelete(req.params.id);
    if (hos) res.send(hos);
    else res.send("Hospital with this id doesn't exits")
  })

  module.exports = router;
  