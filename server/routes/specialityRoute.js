const express = require('express')
const router = express.Router();

const {Speciality} = require('../models/speciality');

    router.get("/", async (req, res) => {
    const sp = await Speciality.find();
    res.send(sp);
  });

  module.exports = router;