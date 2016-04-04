module.exports = function (mongoose) {
  var TripSchema = require("./../../models/trip/trip.server.schema.js")(mongoose);
  var tripModel = mongoose.model('Trip', TripSchema);

  return {
    createTrip: createTrip,
    findTripById: findTripById,
    findAllTripByUser: findAllTripByUser,
    updateTrip: updateTrip,
    deleteTrip: deleteTrip
  };

  function createTrip(trip) {
    return new tripModel(trip).save(responseFromServer);
  }

  function findTripById(id) {
    return tripModel.findOne({_id: id}, responseFromServer);
  }

  function findAllTripByUser(userId) {
    return tripModel.find({userId: userId}, responseFromServer);
  }

  function updateTrip(trip) {
    var id = trip['_id'];
    delete trip['_id'];
    return tripModel.findOneAndUpdate({_id: id},
        {$set: trip}, {"new": true}).exec(responseFromServer);
  }

  function deleteTrip(id) {
    var query = tripModel.findByIdAndRemove(id);
    return query.exec(responseFromServer);
  }

  function responseFromServer(error, response) {
    if (!error) {
      return response;
    } else {
      return error;
    }
  }
};