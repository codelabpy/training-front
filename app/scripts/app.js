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
      console.log("entra aca primero");
      e.preventDefault();
      $rootScope.ERROR = '';
      var email = $scope.user.email;
      var password = $scope.user.password;
      dbFire.login(email, password);
    },

    $scope.facebook = function(e) {
      console.log("entra en facebook");
      e.preventDefault();
      $rootScope.ERROR = '';
      dbFire.loginFacebook();
    },

    $scope.SignInGoogle = function(e) {
      console.log("entra en google");
      e.preventDefault();
      $rootScope.ERROR = '';
      dbFire.loginGoogle();
    }

    $scope.SignInGit = function(e) {
      console.log("entra en git");
      e.preventDefault();
      $rootScope.ERROR = '';
      dbFire.loginGit();
    }
  }
]);

/*pasantiaApp.controller("loginControllerG", ["$scope",'dbFire', '$rootScope',
function($scope, dbFire, $rootScope) {
    $scope.user = {};
    $scope.SignInGoogle = function(e) {
      dbFire.loginGoogle();
    }
  }
]);*/
/*
pasantiaApp.controller("loginController", ["$scope",'dbFire', '$rootScope',
  function($scope, dbFire, $rootScope) {
    $scope.user = {};
    $scope.SignInfacebook = function(e) {
      dbFire.loginfacebook();
    }
  }
]);*/

