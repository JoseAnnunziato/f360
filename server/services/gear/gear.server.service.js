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
        .then(function(response) {
          findAllGear(req, res);
        }, function(error) {
          console.log(error);
        });
  }

  function findAllGear(req, res) {
    gearDao.findAllGear().then(function(response) {
      res.json(response);
    });
  }

  function findGearById(req, res) {
    gearDao.findGearById(req.params.id).then(function(response) {
      res.json(response);
    });
  }

  function findAllGearByUser(req, res) {
    gearDao.findAllGearByUser(req.params.id).then(function(response) {
      res.json(response);
    });
  }

  function updateGear(req, res) {
    var gear = req.body;
    gearDao.updateGear(gear).then(function(response) {
      findAllGear(req, res);
    });
  }

  function deleteGear(req, res) {
    var id = req.params.id;
    gearDao.deleteGear(id).then(function(response, err) {
      if(!err)
        findAllGear(req, res);
      else{
        console.log(err);
      }});
  }

  function success(data) {
    return data;
  }

  function error(err) {
    return err;
  }
};
