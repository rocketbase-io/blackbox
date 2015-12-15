const mongoose = require('mongoose');
const logger = require('../util/logging')('mongo');

const readWriteOptions = {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'lastModified'
  },
  typeKey: '$type',
  toObject: {getters: true},
  toJSON: {getters: true, virtuals: false},
  emitIndexErrors: true
};

const readOnlyOptions = {
  timestamps: {
    createdAt: 'created'
  },
  typeKey: '$type',
  toObject: {getters: true},
  toJSON: {getters: true, virtuals: false},
  emitIndexErrors: true
};


var model = function (name, schema, readOnly) {
  let result;
  if (readOnly === undefined || !readOnly) {
    result = mongoose.model(name, new mongoose.Schema(schema, readWriteOptions));
  } else {
    result = mongoose.model(name, new mongoose.Schema(schema, readOnlyOptions));
  }
  result.on('error', function (error) {
    logger.error('could not perform mongo action: %s', error);
  });

  return result;
};

module.exports = {
  model: model,
  objectId: mongoose.Schema.Types.ObjectId
};
