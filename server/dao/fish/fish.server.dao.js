module.exports = function (mongoose) {
  var FishSchema = require("./../../models/fish/fish.server.schema.js")(mongoose);
  var fishModel = mongoose.model('Fish', FishSchema);

  return {
    createFish: createFish,
    findFishById: findFishById,
    findAllFishesByTrip: findAllFishesByTrip,
    updateFish: updateFish,
    deleteFish: deleteFish
  };

  function createFish(fish) {
    return new fishModel(fish).save(responseFromServer);
  }

  function findFishById(id) {
    return fishModel.findOne({_id: id}, responseFromServer);
  }

  function findAllFishesByTrip(tripId) {
    return fishModel.find({tripId: tripId}, responseFromServer);
  }

  function updateFish(fish) {
    var id = fish['_id'];
    delete fish['_id'];
    return fishModel.findOneAndUpdate({_id: id},
        {$set: fish}, {"new": true}).exec(responseFromServer);
  }

  function deleteFish(id) {
    var query = fishModel.findByIdAndRemove(id);
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