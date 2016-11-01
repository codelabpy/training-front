// Code goes here

var pasantiaApp = angular.module("pasantiaApp", ['ui.router', 'firebase']);



pasantiaApp.config(
  ["$stateProvider", "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/login");

      $stateProvider
        .state('base', {
          abstract: true,
          url: '',
          templateUrl: 'views/base.html',
          controller: 'mainCtrl'
        })
        .state("template1", {
          url: "/template1",
          parent: "base",
          templateUrl: "views/template1.html",
          controller: "tmp1Controller"
        })
        .state("template2", {
          url: "/template2",
          parent: "base",
          templateUrl: "views/template2.html",
          controller: "tmp2Controller"
        })
        .state("login", {
          url: "/login",
          templateUrl: "views/login.html",
          controller: "loginController"
        })


      ;

    }
  ]);

pasantiaApp.controller("mainCtrl", ["$scope", 'dbFire',
  function($scope, dbFire) {
    $scope.LogOut = function(e) {
      e.preventDefault();
      dbFire.logout();
    }
  }
]);
pasantiaApp.controller("tmp1Controller", ["$scope", 'dbFire',
  function($scope, dbFire) {

    dbFire.hayUsuarioLogueado();

  }
]);

pasantiaApp.controller("tmp2Controller", ["$scope", 'dbFire',
  function($scope, dbFire) {
    dbFire.hayUsuarioLogueado();
  }
]);
pasantiaApp.controller("loginController", ["$scope",'dbFire', '$rootScope',
  function($scope, dbFire, $rootScope) {
    $scope.user = {};
    $scope.SignIn = function(e) {
      e.preventDefault();
      $rootScope.ERROR = '';
      var email = $scope.user.email;
      var password = $scope.user.password;
      dbFire.login(email, password);

    }
  $scope.SignInG = function(e) {
      e.preventDefault();
      $rootScope.ERROR = '';
      var email = $scope.user.email;
      var password = $scope.user.password;
      dbFire.glogin(email, password);
      
    }

  }

]);