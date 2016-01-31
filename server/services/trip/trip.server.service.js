module.exports = function (app, tripDao, mongoose) {
  app.post("/f360/api/user/:id/trip", createTrip);
  app.get("/f360/api/user/:id/trip", findAllTripByUser);
  app.get("/f360/api/user/:id/trip/:id", findTripById);
  app.put("/f360/api/trip", updateTrip);
  app.delete("/f360/api/trip/:id", deleteTrip);


  function createTrip(req, res) {
    var trip = req.body;
    // to make sure the trip is lined with the user (as FK)
    trip["userId"] = mongoose.Types.ObjectId(req.params.id);
    tripDao.createTrip(trip)
        .then(function (response) {
          findAllTripByUser(req, res);
        }, function (err) {
          error(res, err);
        });
  }

  function findAllTripByUser(req, res) {
    tripDao.findAllTripByUser(req.params.id).then(function (response) {
      success(res, response);
    }, function (err) {
      error(res, err);
    });
  }

  function findTripById(req, res) {
    tripDao.findTripById(req.params.id).then(function (response) {
      success(res, response);
    }, function (err) {
      error(res, err);
    });
  }

  function updateTrip(req, res) {
    var trip = req.body;
    tripDao.updateTrip(trip).then(function (response) {
      findAllTripByUser(req, res);
    }, function (err) {
      error(res, err);
    });
  }

  function deleteTrip(req, res) {
    var id = req.params.id;
    tripDao.deleteTrip(id).then(function (response) {
      findAllTripByUser(req, res);
    }, function (err) {
      error(res, err);
    });
  }

  function success(res, data) {
    res.json(data);
  }

  function error(res, err) {
    res.json(err);
  }
};
