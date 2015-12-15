var common = require('./common');

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

Boat.findOne({name: mary.name}).then(
  function (result) {
    console.log('loaded %s', result);
    mary = result;
  },
  function (error) {
    console.log('could not find boat %s', error);
    mary.save(function (err, smary) {
        if (err) return console.error(err);
        mary = smary;
        console.log('saved %s', mary);
      }
    );
  }
)
;



