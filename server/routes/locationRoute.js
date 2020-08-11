const express = require('express')
const router = express.Router();

const {City} = require('../models/city');
const {Area} = require('../models/area');

// list of all city name
    router.get("/cities", async (req, res) => {
    const cti = await City.find();
    res.send(cti);
  });

  router.get("/:cityName", async (req, res) => {
    let city = await City.findOne({name : req.params.cityName});
    
    let cityId = '';
    if(city) cityId = city._id;
    else 
    res.status(404).send ("city does not exit")

    const areas = await Area.find({city: cityId});
    res.status(200).send(areas);
  });

  module.exports = router;