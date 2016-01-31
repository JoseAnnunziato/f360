module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  return new Schema({
    title: String,
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date, default: Date.now},
    notes: String,
    photos: [Buffer],
    // ref key should not allow any other ObjectId to be pushed but from USER collection
    // but for some reason it's not working.
    userId: {type: Schema.ObjectId, ref: 'User'},
    fishes: [{
      fishId: {type: Schema.ObjectId, ref: 'Fish'},
      fishName: String
    }]
  }, {collection: 'Trip'});
};