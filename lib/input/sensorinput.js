var net = require('net');
var event = require('../bus/event');

exports.Socket = function (host, port) {
  var isConnected = false;

  function connectionClose(had_error) {
    if (had_error) {
      // retry
      setTimeout(function () {
        socket = net.connect(port, host, connectionEstablished);
      }, 500);
    }
  }

  function connectionEstablished() {
    isConnected = true;
    console.log('connected to server %s on port %d', host, port);
    socket.setKeepAlive(true);
    socket.on('data', function (data) {
      //console.log('receiving data %s', data);
      event.EventBus.post(new event.SensorDataReceivedEvent(data));
    });
    socket.on('close', connectionClose);
  }

  function sendDataBackToSensorNet(event) {
    console.log('sending event back to sensor %s', event.text);
    socket.write(event.text);
  }


  var socket = net.connect(port, host, connectionEstablished);
  event.EventBus.on(event.ClientDataReceivedEvent).register(sendDataBackToSensorNet);
}


