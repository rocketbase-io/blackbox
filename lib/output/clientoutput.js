var net = require('net');
var event = require('../bus/event');

exports.Socket = function (port) {
  var isConnected = false;

  var clients = [];


  var server = net.createServer(function (socket) {

    // Identify this client
    socket.name = socket.remoteAddress + ":" + socket.remotePort

    // Put this new client in the list
    clients.push(socket);


    // Remove the client from the list when it leaves
    socket.on('end', function () {
      clients.splice(clients.indexOf(socket), 1);
    });

    socket.on('timeout', function () {
      console.log('timeout occured disconnected client: %s', socket.name);
      clients.splice(clients.indexOf(socket), 1);
    });

    socket.on('error', function (error) {
      console.log('error %s occured disconnected client: %s', error, socket.name);
      clients.splice(clients.indexOf(socket), 1);
    });

    socket.on('data', function (data) {
      event.EventBus.post(new event.ClientDataReceivedEvent(data));
    });

    console.log('Started to serve client: ' + socket.name);
  }).listen(port);

  function sendDataToAllConnectedClients(data) {
    //console.log('sending %s', data.text);
    clients.forEach(function (client) {
      client.write(data.text);
    });
  }


  event.EventBus.on(event.SensorDataReceivedEvent).register(sendDataToAllConnectedClients);
}


