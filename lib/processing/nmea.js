var nmea = require('libnmea');
var event = require('../bus/event');


// $YXMTW,24.9,C*1D - Transducer /  water temperature
// $VWVHW,,T,,M,0.00,N,0.00,K*54 - Velocity Sensor, Speed Log, Water, Mechanical / Water speed and heading
// $SDDBT,,f,,M,,F*28 - Sounder, Depth / Depth below transducer
// $VWVLW,0.0,N,0.0,N*4C - Velocity Sensor, Speed Log, Water, Mechanical / Distance Traveled through Water
// $SDDPT,,*57 - Sounder, Depth / Depth of water

exports.nmeaIncomingProcessor = function () {

  function processRawInput(event) {
    var raw = event.text;
    console.log('processing raw input %s', raw);
    try {
      var nmeasentence = nmea.parse(raw.toString());
      console.log('processed %s', JSON.stringify(nmeasentence));
    }
    catch (e) {
      console.error("caught exception %s", e);
    }
  }

  event.EventBus.on(event.SensorDataReceivedEvent).register(processRawInput);

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

sendTestGPSSentence();
