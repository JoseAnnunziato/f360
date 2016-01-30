module.exports = function (app, mongoose) {
  var userDao = require("./dao/user/user.server.dao.js")(mongoose);
  var userService = require("./services/user/user.server.service.js")(app, userDao);

  var gearDao = require("./dao/gear/gear.server.dao")(mongoose);
  var gearService = require("./services/gear/gear.server.service")(app, gearDao);
};
