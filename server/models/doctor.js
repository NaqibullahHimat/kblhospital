const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
 },

 email:{
   type:String,
   required:true,
   minLength: 2,
    maxLength: 50,
 },
 password:{
  type:String,
  required:true,
  minLength: 8,
   maxLength: 20,
 },
 address:{
  type:String,
  required:true,
  minLength: 8,
   maxLength: 50,
 },
 area:{
  type: String,
  required:true
},
city:{
  type:String,
  required:true
},
  qualification: {
    type: String,
    required: true
  },
  license:{
    type: String,
    required: true
  },
  services: {
    type: [String]
  },
  experience:{
    type: Number,
    required:true
  },
  contact:{
    type:String
  },
  fee:{
    type:Number
  },
  avgWaitTime:{
    type:String,
    required:true
  },
  avgCheckTime:{
    type:String,
    required:true
  },
  avbStartTime:{
    type:String,
    required:true
  },
  avbEndTime:{
    type:String,
    required:true
  },
  speciality:{
    type:String,
    required:true
  },
  hospital:{
    type: String
    // type:mongoose.Schema.Types.ObjectId,
    // ref: 'Hospital',
  },
  
  avbDays:[{
    type:String,
    required:true
  }],
  image:{
    type:String
  }
 
});

const Doctor = mongoose.model('Doctor', doctorSchema);

exports.Doctor = Doctor;