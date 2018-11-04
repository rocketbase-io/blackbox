var nmea = require('libnmea');
var event = require('../bus/event');
const logger = require('../util/logging')('nmea');

exports.processNMEA = function () {

  function processRawInput(ev) {
    var raw = ev.text;
    logger.info('processing raw input %s', raw);
    try {
      var nmeasentence = nmea.parse(raw.toString());
      logger.debug('processed %s', JSON.stringify(nmeasentence));
      event.EventBus.post(new event.NMEAEvent(nmeasentence));
    } catch (e) {
      logger.error('caught exception %s', e);
    }
  }

  event.EventBus.on(event.SensorDataReceivedEvent)
    .register(processRawInput);

};

function sendTestGPSSentence() {
  event.EventBus.post(new event.ClientDataReceivedEvent(
    nmea.encode('GPGGA', {
      date: new Date(),
      lat: 53.54883,
      lon: 9.862,
      fix: 1,
      satellites: 4,
      hdop: 1.0,
      altitude: -48,
      aboveGeoid: 0
    }) + '\r\n'));
  event.EventBus.post(new event.ClientDataReceivedEvent(
    nmea.encode('GPRMC', {
      date: new Date(),
      status: 'A',
      lat: 53.54883,
      lon: 9.862,
      speed: 0,
      course: 0.0,
      variation: 0.0
    }) + '\r\n'));
  setTimeout(sendTestGPSSentence, 1000);
}

//sendTestGPSSentence();
