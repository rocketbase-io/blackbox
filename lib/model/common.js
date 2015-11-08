var mongoose = require('mongoose'),
  winston = require('winston');

exports.Generator = function () {

  var options = {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'lastModified'
    },
    typeKey: '$type',
    toObject: {getters: true},
    toJSON: {getters: true, virtuals: false},
    emitIndexErrors: true
  };

  var model = function (name, schema) {
    var result = mongoose.model(name, new mongoose.Schema(schema, options));
    result.on('error', function (error) {

    });

    return result;
  }

  return {
    model: model
  }
};


var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({level: 'info'}),
    new (winston.transports.File)({
      filename: 'debug.log',
      level: 'DEBUG'
    })
  ]
});

exports.logger = function () {


  return {
    debug: function (message) {
      winston.debug(message);
    },
    info: function (message) {
      winston.info(message);
    },

  };
};
