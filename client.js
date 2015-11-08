var net = require('net');


var client = net.connect({port: 5000}, function () {
    console.log('connected to server!');
});

client.on('data', function (data) {
    console.log('received data:');
    console.log(data.toString());
})