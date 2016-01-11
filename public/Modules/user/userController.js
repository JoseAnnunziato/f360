(function () {
  angular.module('f360Admin').controller('UserController', userController);

  userController.$inject = ['UserService', '$scope', '$modal', '$log'];

  function userController (userService, $scope, $modal, $log){

    var self = this;
    self.open = open;
    self.removeUser = removeUser;

    init();

    function init(){
      userService.findAllUsers().then(successHandler).catch(errorHandler);
    }


    function open (object) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: './Modules/user/userModal.html',
        controller: 'userModalController',
        controllerAs: 'modalCtrl',
        resolve: {
          user : function () {
            if (object === ''){
              return '';
            } else {
              return object;
            }
          }
        }
      });

      modalInstance.result.then(function (user) {
        if (user.hasOwnProperty('_id')) {
          userService.updateUser(user).then(successHandler).catch(errorHandler);
        } else {
          userService.createUser(user).then(successHandler).catch(errorHandler);
        }
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });

    }

    function removeUser(user) {
      userService.removeUser(user).then(successHandler).catch(errorHandler);
    }

    function successHandler(response) {
      self.users = response;
    }

    function errorHandler(error) {
      return error;
    }

  }

})();