(function () {
  angular.module('f360Admin').controller('userModalController', userModalController);

  userModalController.$inject = ['$modalInstance', 'user'];

  function userModalController($modalInstance, user) {

    var self = this;

    self.userToUpdate = user;

    self.ok = function () {
      $modalInstance.close(self.userToUpdate);
    };

    self.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  }

})();