var nmea = require('libnmea');
var event = require('../bus/event');


// $YXMTW,24.9,C*1D - Transducer /  water temperature
// $VWVHW,,T,,M,0.00,N,0.00,K*54 - Velocity Sensor, Speed Log, Water, Mechanical / Water speed and heading
// $SDDBT,,f,,M,,F*28 - Sounder, Depth / Depth below transducer
// $VWVLW,0.0,N,0.0,N*4C - Velocity Sensor, Speed Log, Water, Mechanical / Distance Traveled through Water
// $SDDPT,,*57 - Sounder, Depth / Depth of water

exports.NMEAIncomingProcessor = function () {

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
