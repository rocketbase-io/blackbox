#!/usr/bin/env node

require('./lib/bus/event');
require('./lib/model/exportsensordata');


const sensorinput = require('./lib/input/sensorinputtcp');
const clientoutput = require('./lib/output/clientoutput');
const nmea = require('./lib/processing/nmea');
const logger = require('./lib/util/logging')('server');

logger.info('starting up server');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blackbox');

// first define input
sensorinput.socket('172.16.1.2', 10110);

// at last the output will been sending to client
clientoutput.socket(5000);


nmea.processNMEA();
