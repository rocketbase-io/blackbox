var cobu = require('cobu-eventbus');

exports.EventBus = new cobu.EventBus();

exports.SensorDataReceivedEvent = function (data) {
  this.type = 'SensorDataReceivedEvent';
  this.text = data;
};

exports.ClientDataReceivedEvent = function (data) {
  this.type = 'ClientDataReceivedEvent';
  this.text = data;
};

exports.NMEAEvent = function (data) {
  this.type = 'NMEAEvent';
  this.data = data;
};
