const logger = require('../util/logging')('dgram');
const event = require('../bus/event');
const dgram = require('dgram');

exports.socket = function (port) {
  var server = dgram.createSocket('udp4');

  var connected = false;

  server.on('error', function (err) {
    logger.error('server error:\n' + err.stack);
    server.close();
  });

  server.on('message', function (data) {
    // first add new source if appropriate
    logger.debug('received %s', data);
    event.EventBus.post(new event.SensorDataReceivedEvent(data));
  });

  server.on('listening', function () {
    var address = server.address();
    logger.info('server listening ' +
      address.address + ':' + address.port);
    connected = true;
  });

  function sendDataBackToSensorNet(clientDataReceivedEvent) {
    var sentence = clientDataReceivedEvent.text;
    logger.debug('sending event back to sensor %s', sentence);
    if (connected) {
      server.send(sentence, 0, sentence.toString().length, 10110, '192.168.178.54', function (err) {
        logger.debug('UDP message sent! %s', err);
      });
    }
  }

  server.bind(port);
  event.EventBus.on(event.ClientDataReceivedEvent)
       .register(sendDataBackToSensorNet);
};
