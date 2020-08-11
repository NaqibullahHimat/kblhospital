const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hosEmail:{
    type:String,
    required:true
  },
  hosPassword:{
    type:String,
    required:true
  },
  hosAddress: {
    type: String,
    required: true,
  },
  city: {
	  type: String,
	  required: true,
  },
  area: {
    type: String,
    required: true 
  },
  hosContact: {
	  type: Number,
	  required: true
    },
  hosImage: {
    type: String,
    default: ""
  },
    
}); 

const Hospital = mongoose.model('Hospital', hospitalSchema);

exports.Hospital = Hospital;