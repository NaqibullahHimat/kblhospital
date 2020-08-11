const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  name:{
    type: String
  },
  city: {
      type: mongoose.Types.ObjectId,
      ref: 'City',
      required: true
  }
});
const Area = mongoose.model('Area',areaSchema);
exports.Area = Area;