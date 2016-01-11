module.exports = function (mongoose) {
  var Schema = mongoose.Schema;
  return new Schema({
    userName: String,
    firstName: String,
    lastName: String
  }, {collection: 'User'});

};