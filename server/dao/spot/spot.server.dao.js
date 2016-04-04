module.exports = function (mongoose) {
    var SpotSchema = require("./../../models/spot/spot.server.schema")(mongoose);
    var spotModel = mongoose.model('Spot', SpotSchema);

    return {
        createSpot: createSpot,
        findSpotById: findSpotById,
        findAllSpotsByUser: findAllSpotsByUser,
        updateSpot: updateSpot,
        deleteSpot: deleteSpot
    };

    function createSpot(spot) {
        return new spotModel(spot).save(responseFromServer);
    }

    function findSpotById(id) {
        return spotModel.findOne({_id: id}, responseFromServer);
    }

    function findAllSpotsByUser(userId) {
        return spotModel.find({userId: userId}, responseFromServer);
    }

    function updateSpot(spot) {
        var id = spot['_id'];
        delete spot['_id'];
        return spotModel.findOneAndUpdate({_id: id},
            {$set: spot}, {"new": true}).exec(responseFromServer);
    }

    function deleteSpot(id) {
        var query = spotModel.findByIdAndRemove(id);
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