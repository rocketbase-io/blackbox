var common = require('./common');

exports.Position = common.model('Position', {
  lat: Number,
  lng: Number,
  bearing: Number
}, true);

exports.Wind = common.model('Wind', {
  aws: Number,
  awa: Number
}, true);

exports.Log = common.model('Speed', {
  sog: Number,
  vmg: Number,
  compass: Number
}, true);

exports.Gyration = common.model('Gyration', {
  pitch: Number,
  roll: Number,
  nick: Number
}, true);

exports.Weather = common.model('Weather', {
  temperature: Number,
  pressure: Number,
  twa: Number,
  tws: Number
}, true);
