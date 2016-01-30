module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  return new Schema({
    name: String,
    userId: Schema.ObjectId,
    type: {type: String, enum: [null, 'ROD', 'LINE', 'LEADER', 'REEL', 'PRESENTATION']},
    rodType: {type: String, enum: [null, 'SPINNING', 'CASTING', 'FLY']},
    reelType: {type: String, enum: [null, 'SPINNING', 'CASTING', 'FLY']},
    lineType: {type: String, enum: [null, 'BRAID', 'MONOFILAMENT', 'FLUOROCARBON', 'FLY']},
    presentationType: {type: String, enum: [null, 'LURE', 'FLY', 'BAIT']},
    manufacturer: String,
    model: String,
    description: String,
    notes: String,
    photos: [Schema.ObjectId],
    length: Number,
    action: String,
    power: String,
    pieces: String,
    weight: Number,
    gearRatio: Number,
    lineCapacity: Number,
    maxDrag: Number,
    strength: String,
    color: String,
    line: String
  }, {collection: 'Gear'});

};