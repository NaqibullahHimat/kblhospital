const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

  ptName: {
    type: String,
    required:true
 },
  
  doctorId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Doctor'
  },
  ptContact:{
    type:String,
    required:true
  },
  
  apDay:{
    // apDate
    type: String,
    required:true
    
  },
  apTime:{
    type: String,
    required:true
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

exports.Appointment = Appointment;