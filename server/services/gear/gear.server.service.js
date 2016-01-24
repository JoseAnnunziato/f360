module.exports = function (app, gearDao) {
  app.post("/f360/api/gear", createGear);
  app.get("/f360/api/gear", findAllGear);
  app.get("/f360/api/gear/:id", findGearById);
  app.get("/f360/api/user/:id/gear", findAllGearByUser);
  app.put("/f360/api/gear", updateGear);
  app.delete("/f360/api/gear/:id", deleteGear);


  function createGear(req, res) {
    var gear = req.body;
    gearDao.createGear(gear)
        .then(function (response) {
          findAllGear(req, res);
        }, function (err) {
          error(res, err);
        });
  }

  function findAllGear(req, res) {
    gearDao.findAllGear().then(function (response) {
      success(res, response);
    }, function (err) {
      error(res, err);
    });
  }

  function findGearById(req, res) {
    gearDao.findGearById(req.params.id).then(function (response) {
      success(res, response);
    }, function (err) {
      error(res, err);
    });
  }

  function findAllGearByUser(req, res) {
    gearDao.findAllGearByUser(req.params.id).then(function (response) {
      success(res, response);
    }, function (err) {
      error(res, err);
    });
  }

  function updateGear(req, res) {
    var gear = req.body;
    gearDao.updateGear(gear).then(function (response) {
      findAllGear(req, res);
    }, function (err) {
      error(res, err);
    });
  }

  function deleteGear(req, res) {
    var id = req.params.id;
    gearDao.deleteGear(id).then(function (response) {
      findAllGear(req, res);
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
