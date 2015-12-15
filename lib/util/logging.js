const winston = require('winston');
const util = require('util');
const dateformat = require('dateformat');

winston.emitErrs = true;

const winstonLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      formatter: function (options) {
        var now = dateformat(new Date(), 'dd.mm.yyyy hh:MM:ss');
        // Return string will be passed to logger.
        return now + ' | ' + options.level.toUpperCase() + ' | ' + (undefined !== options.message ? options.message : '');
      }

    })
  ],
  exitOnError: false
});

const logger = function (category) {
  return {
    log: function (type, message, ...objects) {
      winstonLogger.log(type, util.format('%s | ' + message, category, objects));
    },

    debug: function (message, ...objects) {
      this.log('debug', message, objects);
    },

    info: function (message, ...objects) {
      this.log('info', message, objects);
    },

    warn: function (message, ...objects) {
      this.log('warn', message, objects);
    },

    error: function (message, ...objects) {
      this.log('error', message, objects);
    }

  };
};


module.exports = logger;
