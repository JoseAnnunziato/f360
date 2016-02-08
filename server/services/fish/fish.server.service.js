module.exports = function (app, fishDao, tripDao, mongoose) {
  app.post("/f360/api/trip/:tripId/fish", createFish);
  app.get("/f360/api/trip/:tripId/fish", findAllFishesByTrip);
  app.get("/f360/api/fish/:fishId", findFishById);
  app.put("/f360/api/trip/:tripId/fish", updateFish);
  app.delete("/f360/api/trip/:tripId/fish/:fishId", deleteFish);


  function createFish(req, res) {
    var fish = req.body;
    var newFishDoc = {};
    fish["tripId"] = mongoose.Types.ObjectId(req.params.tripId);
    fishDao.createFish(fish)
        .then(
            function (response) {
              newFishDoc = response._doc;
              return tripDao.findTripById(req.params.tripId);
            }, function (err) {
              error(res, err);
            })
        .then(
            function (response) {
              response._doc['fishes'].push(
                  {
                    'fishId': mongoose.Types.ObjectId(newFishDoc._id),
                    'fishName': newFishDoc.fishName
                  });
              tripDao.updateTrip(response._doc);
            }, function (error) {
              error(res, err);
            })
        .then(
            function (response) {
              findAllFishesByTrip(req, res);
            }, function (error) {
              error(res, err);
            }
        );
  }

  function findAllFishesByTrip(req, res) {
    fishDao.findAllFishesByTrip(req.params.tripId).then(function (response) {
      success(res, response);
    }, function (err) {
      error(res, err);
    });
  }

  function findFishById(req, res) {
    fishDao.findFishById(req.params.fishId).then(function (response) {
      success(res, response);
    }, function (err) {
      error(res, err);
    });
  }

  function updateFish(req, res) {
    var fish = req.body;
    fishDao.updateFish(fish).then(function (response) {
      findAllFishesByTrip(req, res);
    }, function (err) {
      error(res, err);
    });
  }

  function deleteFish(req, res) {
    var fishId = req.params.fishId;
    var oldFishDoc = {};
    fishDao.deleteFish(fishId)
        .then(
            function (response) {
              oldFishDoc = response._doc;
              return tripDao.findTripById(req.params.tripId);
            }, function (err) {
              error(res, err);
            })
        .then(
            function (response) {
              var index = matchFishObject(fishId, response._doc['fishes']);
              response._doc['fishes'].splice(index, 1);
              tripDao.updateTrip(response._doc);
            }, function (error) {
              error(res, err);
            });
  }

  var matchFishObject = function (element, array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].fishId.toString() === element)
        return i;
    }
    return null;
  };

  function success(res, data) {
    res.json(data);
  }

  function error(res, err) {
    res.json(err);
  }
};
