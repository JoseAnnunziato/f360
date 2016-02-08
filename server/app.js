module.exports = function (app, mongoose) {
  var userDao = require("./dao/user/user.server.dao.js")(mongoose);
  require("./services/user/user.server.service.js")(app, userDao);

  var gearDao = require("./dao/gear/gear.server.dao")(mongoose);
  require("./services/gear/gear.server.service")(app, gearDao);

  var tripDao = require("./dao/trip/trip.server.dao")(mongoose);
  require("./services/trip/trip.server.service")(app, tripDao, mongoose);

  var fishDao = require("./dao/fish/fish.server.dao")(mongoose);
  require("./services/fish/fish.server.service")(app, fishDao, tripDao, mongoose);

};
