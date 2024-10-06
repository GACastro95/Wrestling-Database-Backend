const Counter = require('../models/counter');

async function getNextSequenceValue(sequenceName) {
  const sequenceDocument = await Counter.findByIdAndUpdate(
    sequenceName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.seq;
}

async function findAvailableId(providedId, sequenceName, model) {
  let id = providedId || (await getNextSequenceValue(sequenceName));
  while (await model.findById(id)) {
    id = await getNextSequenceValue(sequenceName);
  }
  return id;
}

module.exports = { getNextSequenceValue, findAvailableId };
