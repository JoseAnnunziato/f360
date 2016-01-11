module.exports = function (app, userDao) {
  app.post("/f360/user", createUser);
  app.get("/f360/user", findAllUsers);
  app.get("/f360/user/:id", findUserById);
  app.put("/f360/user", updateUser);
  app.delete("/f360/user/:id", deleteUser);


  function createUser(req, res) {
    var user = req.body;
    userDao.createUser(user)
        .then(function(response) {
          findAllUsers(req, res);
        });
  }

  function findAllUsers(req, res) {
    userDao.findAllUsers().then(function(response) {
      res.json(response);
    });
  }

  function findUserById(req, res) {
    userDao.findUserById(req.params.id).then(function(response) {
      res.json(response);
    });
  }

  function updateUser(req, res) {
    var user = req.body;
    userDao.updateUser(user).then(function(response) {
      findAllUsers(req, res);
    });
  }

  function deleteUser(req, res) {
    var id = req.params.id;
    userDao.deleteUser(id).then(function(response, err) {
      if(!err)
        findAllUsers(req, res);
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
