const common = require('./common');
const logger = require('../util/logging')('boat');

var Boat = common.model('Boat', {
  name: String,
  loa: Number,
  beam: Number,
  draft: Number,
  height: Number

});
exports.Boat = Boat;


var mary = new Boat({
  name: 'Marysol',
  loa: 11.0,
  beam: 3.95,
  draft: 1.9,
  height: 16.0
});

Boat.findOne({name: mary.name})
    .then(
      function (result) {
        logger.debug('loaded %s', result);
        mary = result;
      },
      function (error) {
        logger.debug('could not find boat %s', error);
        mary.save(function (err, smary) {
            if (err) {
              logger.error(err);
              return;
            }
            mary = smary;
            logger.debug('saved %s', mary);
          }
        );
      }
    );
