module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  return new Schema({
    fishName: {type: String},
    caughtDate: {type: Date, default: Date.now},
    species: {type: String},
    weight: {type: Number},
    length: {type: Number},
    girth: {type: String},
    presentation: {type: String},
    photos: [Buffer],
    weather: {
      waterDepth: {type: Number},
      waterTemperature: {type: Number},
      waterClarity: {type: Number},
      sunriseTime: {type: Date, default: Date.now},
      sunsetTime: {type: Date, default: Date.now},
      moonPhase: {type: String},
      moonriseTime: {type: Date, default: Date.now},
      moonsetTime: {type: Date, default: Date.now}
    },
    gearId: {type: Schema.ObjectId, ref: 'Gear'},
    spotId: {type: Schema.ObjectId, ref: 'Spot'},
    tripId: {type: Schema.ObjectId, ref: 'Trip'}
  }, {collection: 'Fish'});
};