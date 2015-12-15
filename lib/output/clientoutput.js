var net = require('net');
var event = require('../bus/event');
const logger = require('../util/logging')('clientoutput');

exports.socket = function (port) {
  var clients = [];


  net.createServer(function (clientSocket) {

       // Identify this client
       clientSocket.name = clientSocket.remoteAddress + ':' + clientSocket.remotePort;

       // Put this new client in the list
       clients.push(clientSocket);

       // Remove the client from the list when it leaves
       clientSocket.on('end', function () {
         clients.splice(clients.indexOf(clientSocket), 1);
       });

       clientSocket.on('timeout', function () {
         logger.error('timeout occured disconnected client: %s', clientSocket.name);
         clients.splice(clients.indexOf(clientSocket), 1);
       });
       clientSocket.on('error', function (error) {
         logger.error('error %s occured disconnected client: %s', error, clientSocket.name);
         clients.splice(clients.indexOf(clientSocket), 1);
       });
       clientSocket.on('data', function (data) {
         event.EventBus.post(new event.ClientDataReceivedEvent(data));
       });

       logger.info('Started to serve client: ' + clientSocket.name);
     })
     .listen(port);

  function sendDataToAllConnectedClients(data) {
    //console.log('sending %s', data.text);
    clients.forEach(function (client) {
      client.write(data.text);
    });
  }


  event.EventBus.on(event.SensorDataReceivedEvent)
       .register(sendDataToAllConnectedClients);
};
