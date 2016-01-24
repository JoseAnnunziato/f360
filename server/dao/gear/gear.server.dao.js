module.exports = function (mongoose) {
  var GearSchema = require("./../../models/gear/gear.server.schema.js")(mongoose);
  var gearModel = mongoose.model('Gear', GearSchema);

  return {
    createGear: createGear,
    findGearById: findGearById,
    findAllGear: findAllGear,
    findAllGearByUser: findAllGearByUser,
    updateGear: updateGear,
    deleteGear: deleteGear
  };

  function createGear(gear) {
    //return new gearModel.create(gear, responseFromServer);
    return new gearModel(gear).save(responseFromServer);
  }

  function findGearById(id) {
    return gearModel.findOne({_id: id}, responseFromServer);
  }

  function findAllGearByUser(userId) {
    return gearModel.find({userId: userId}, responseFromServer);
  }

  function findAllGear() {
    return gearModel.find({}, responseFromServer);
  }

  function updateGear(gear) {
    var id = gear['_id'];
    delete gear['_id'];
    var query = gearModel.findOneAndUpdate({_id: id}, gear, {new: true});
    return query.exec(responseFromServer);
  }

  function deleteGear(id) {
    var query = gearModel.findByIdAndRemove(id)
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