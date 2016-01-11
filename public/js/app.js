(function () {
  angular.module('f360Admin', ['ngAnimate', 'ngRoute', 'ui.bootstrap'])
      .config(['$routeProvider',
        function ($routeProvider) {
          $routeProvider.
          when('/', {
            redirectTo: 'public/index.html'
          }).
          when('/f360/user', {
            templateUrl: 'Modules/user/user.html',
            controller: 'UserController',
            controllerAs: 'userCtrl'
          }).
          otherwise({
            redirectTo: 'public/index.html'
          });
        }]);
})();