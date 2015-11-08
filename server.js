#!/usr/bin/env node

var
  event = require('./lib/bus/event'),
  sensorinput = require('./lib/input/sensorinput'),
  clientoutput = require('./lib/output/clientoutput'),
  nmea = require('./lib/processing/nmea')
  ;


var mongoose = require('mongoose');
mongoose.connect('mongodb://docker:32768/blackbox');

// first define input
var input = new sensorinput.Socket('shipmodul.fritz.box', 10110);

// at last the output will been sending to client
var output = new clientoutput.Socket(5000);


var nmea = new nmea.NMEAIncomingProcessor();


