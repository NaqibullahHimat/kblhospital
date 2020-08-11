const mongoose = require('mongoose');

const specialitySchema = new mongoose.Schema({
  name:{
    type: String
  }
});
const Speciality = mongoose.model('Speciality',specialitySchema);
exports.Speciality = Speciality;