(function () {
  angular.module("f360Admin").factory('UserService', UserService);

  UserService.$inject = ['$http'];

  function UserService($http) {

    var service = {
      findAllUsers: findAllUsers,
      createUser: createUser,
      updateUser: updateUser,
      removeUser: removeUser
    };

    return service;

    function findAllUsers() {
      return $http.get('/f360/api/user').then(function (response) {
        return response.data;
      }).catch(function (err) {
        return err;
      });
    }

    function createUser(user) {
      return $http.post('/f360/api/user', user).then(function (response) {
        return response.data;
      }).catch(function (err) {
        return err;
      });
    }

    function updateUser(user) {
      return $http.put('/f360/api/user', user).then(function (response) {
        return response.data;
      }).catch(function (err) {
        return err;
      });
    }

    function removeUser(user) {
      var id = user['_id'];
      return $http.delete('/f360/api/user/'+id).then(function (response) {
        return response.data;
      }).catch(function (err) {
        return err;
      });
    }
  }
})();