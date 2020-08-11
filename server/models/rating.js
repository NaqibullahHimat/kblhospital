const mongoos = require('mongoose');

const ratingSchema = new mongoos.Schema({
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
 
  date: {
	  type: Date,
	  default: Date.now
    },
    
    doctor:{
        type: mongoos.Types.ObjectId,
        ref:'Doctor'
      },
    
  ptName: {
	  type: String,
	  required: true
	},
	
}); 

const Rating = mongoos.model('Rating', ratingSchema);

exports.Rating = Rating;