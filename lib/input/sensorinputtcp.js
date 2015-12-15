const net = require('net');
const logger = require('../util/logging')('tcp');
const event = require('../bus/event');

exports.socket = function (host, port) {
  var socket = net.connect(port, host, connectionEstablished);

  function connectionClose(hadError) {
    if (hadError) {
      // retry
      setTimeout(function () {
        socket = net.connect(port, host, connectionEstablished);
      }, 500);
    }
  }

  function connectionEstablished() {
    logger.info('connected to server %s on port %d', host, port);
    socket.setKeepAlive(true);
    socket.on('data', function (data) {
      //console.log('receiving data %s', data);
      event.EventBus.post(new event.SensorDataReceivedEvent(data));
    });
    socket.on('close', connectionClose);
  }

  function sendDataBackToSensorNet(clientDataReceivedEvent) {
    logger.debug('sending event back to sensor %s', clientDataReceivedEvent.text);
    socket.write(clientDataReceivedEvent.text);
  }


  event.EventBus.on(event.ClientDataReceivedEvent)
       .register(sendDataBackToSensorNet);
};
