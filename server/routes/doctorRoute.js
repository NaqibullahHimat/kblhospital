const express = require('express')
const router = express.Router();
const path = require('path');
const {DocValidation} = require('../models/validation');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Doctor} = require('../models/doctor');
const db = require('../_helpers/db');
const {renameFile, deleteFile} = require('./FileHelpers');

var multer = require("multer");
var folderName = __dirname + "/../public/images";
var upload = multer({ dest: folderName });

router.post("/", upload.array('file'), async(req, res) => {
    console.log("doctorRoute",req.body);
    const { error } = DocValidation(req.body);
    if (error){
    console.log(error)
    return res.status(400).send(error.details[0].message);
    }
	
    console.log('1. Files saved successfully');
    let { email, password, ...doctor } = req.body;
	
	let doc = await Doctor.findOne({email});
    if(doc) {
        deleteFile(req.files);
        return res.status(409).send("Doctor already registered");   
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

	const newDoctor = await new Doctor(req.body).save();
	console.log('2. Doctor Data saved successfully');

	const {_id: newDocId} = newDoctor;

    const profilePicName = newDocId + path.extname(req.files[0].originalname);

    renameFile(req.files[0], profilePicName);
  
    await Doctor.findByIdAndUpdate(newDocId, 
      {image: 'images/' + profilePicName});

  console.log('3. Applicant Files renamed and Fields updated successfully');

  const account = await db.Account({
    email,
    passwordHash: password,
    title: "Dr",
    firstName: req.body.name,
    lastName: " ",
    acceptTerms: true,
    role: "Doctor",
    created: new Date(),
    isVerified: false,
    doctorId: newDocId
  }).save();

  console.log('4. Account Info for Applicant saved successfully');
  
  console.log('=> Applicant Registered Successfully.');
  res.status(200).send(newDoctor);
	
})

// list of doctors
router.get("/", async (req, res) => {
    const {city, speciality} = req.query;
    let doc = null;

    if(city)
        doc  = await Doctor.find({city : city});
    else if(speciality)
    doc  = await Doctor.find({speciality : speciality});
    else
    doc = await Doctor.find();

    res.send(doc);
})

router.get("/:id", async (req, res) => {
    const doc = await Doctor.findById(req.params.id);
    if (doc) res.send(doc);
    else res.send("Doctor not found")
})

router.get("/:speciality", async (req, res) => {
    const doc = await Doctor.find({ speciality: req.params.speciality});
    if (doc) res.send(doc);
    else res.send("Doctor not found")
})

router.get("/:city/:speciality", async (req, res) => {
    const doc = await Doctor.find(
        { city: req.params.city, speciality: req.params.speciality}
        );
    if (doc) res.send(doc);
    else res.send("Doctor not found")
})

router.get("/:city", async (req, res) => {
    const doc = await Doctor.find(
        { city: req.params.city}
        );
    if (doc) res.send(doc);
    else res.send("Doctor not found")
})


router.put("/update/:id", async (req, res) => {
    const doc = Doctor.updateOne({_id: req.params._id}, req.body);
    if (doc) res.send(doc);
    else res.send("Couldn't update the credential");
})

router.delete("/:id", async (req, res) => {
    const doc = await Doctor.findByIdAndDelete(req.params.id);
    if (doc)  res.send(doc)
    else res.send("Doctor with this id doesn't exits")
})

module.exports = router;