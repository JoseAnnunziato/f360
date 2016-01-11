module.exports = function (mongoose) {
  var UserSchema = require("./../../models/user/user.server.schema.js")(mongoose);
  var userModel = mongoose.model('User', UserSchema);

  return {
    createUser: createUser,
    findUserById: findUserById,
    findAllUsers: findAllUsers,
    updateUser: updateUser,
    deleteUser: deleteUser
  };

  function createUser(user) {
    //return new userModel.create(user, responseFromServer);
    return new userModel(user).save(responseFromServer);
  }

  function findUserById(id) {
    return userModel.findOne({_id: id}, responseFromServer);
  }

  function findAllUsers() {
    return userModel.find({}, responseFromServer);
  }

  function updateUser(user) {
    var id = user['_id'];
    delete user['_id'];
    var query = userModel.findOneAndUpdate({_id: id}, user, {new: true});
    return query.exec(responseFromServer);
  }

  function deleteUser(id) {
    var query = userModel.findByIdAndRemove(id)
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