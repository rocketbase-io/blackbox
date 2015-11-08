var mongoose = require('mongoose');


exports.Boat = mongoose.model('Boat', new mongoose.Schema({
  name: String,
  loa: Number,
  beam: Number,
  draft: Number,
  height: Number,

  meta: {
    created: {type: Date, default: Date.now()},
    lastmodified: {type: Date, default: Date.now()}
  }

}));
