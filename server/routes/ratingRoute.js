const express = require('express')
const router = express.Router();

const {Rating} = require('../models/rating')

// individual doctor rating
router.get("/:id", async (req, res) => {
    let rt = await Rating.find({doctor: req.params.id})
   
    console.log(rt)
    res.send(rt);
})

// router.get("/", async (req, res) => {
//     const rt = await Rating.find();
//     console.log(rt)
//     res.send(rt);
// })


// router.get("/:id", async (req, res) => {
//     const rt = await Rating.findById(req.params.id);
//     if (rt) res.send(rt);
//     else res.send("Rating not found")
// })

router.post("/:id", async(req, res) => {
    const rating = new Rating({...req.body, doctor: req.params.id}); 
    console.log(rating);
    const rt = await rating.save();
    if (rt) res.send(rt)
    else res.send("Incorrect details")
})

router.put("/update/:id", async (req, res) => {
    const rt = Rating.updateOne({_id: req.params._id}, req.body);
    if (rt) res.send(rt);
    else res.send("Couldn't update the credential");
})

router.delete("/:id", async (req, res) => {
    const rt = await Rating.findByIdAndDelete(req.params.id);
    if (rt)  res.send(rt)
    else res.send("Rating with this id doesn't exits")
})

module.exports = router;