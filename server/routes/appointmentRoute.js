const express = require('express')
const router = express.Router();

const {Appointment} = require('../models/appointment')

router.get("/", async (req, res) => {
    const ap = await Appointment.find();
    res.send(ap);
})

router.get("/:id", async (req, res) => {
    const ap = await Appointment.find({doctorId: req.params.id});
    if (ap) res.send(ap);
    else res.send("Appointment not found")
})

router.post("/", async(req, res) => {
    console.log(req.body)
    const ap = await new Appointment(req.body).populate('doctorId').save();
    if (ap) res.send(ap)
    else res.send("Incorrect details")
})

router.put("/update/:id", async (req, res) => {
    const ap = Appointment.updateOne({_id: req.params._id}, req.body);
    if (ap) res.send(ap);
    else res.send("Couldn't update the credential");
})

router.delete("/:id", async (req, res) => {
    const ap = await Appointment.findByIdAndDelete(req.params.id);
    if (ap)  res.send(ap)
    else res.send("Appointment with this id doesn't exits")
})

module.exports = router;