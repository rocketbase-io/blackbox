const event = require('../bus/event');
const logger = require('../util/logging')('dgram');

const sensor = require('./sensor.js');
const Position = sensor.Position;
const Wind = sensor.Wind;
const Log = sensor.Log;
const Gyration = sensor.Gyration;
const Weather = sensor.Weather;


function receivedEvent(nmeaEvent) {
  logger.debug('processing nmea event %s', nmeaEvent.data);


}

event.EventBus.on(event.NMEAEvent)
     .register(receivedEvent);
