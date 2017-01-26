'use strict';

/**
 * @ngdoc function
 * @name yapp.factory:factory
 * @description
 * # factory
 * Factory of yapp
 */
angular.module('pasantiaApp')

  //Este servicio sera el encargado del manejo de consultas al firebase asi como el manejo de la autenticacion
  .factory('dbFire', ['$firebaseArray', '$firebaseAuth', '$location', '$rootScope', '$firebaseObject', '$state', '$q',
    function ($firebaseArray, $firebaseAuth, $location, $rootScope, $firebaseObject, $state, $q) {

    // Initialize Firebase
       var config = {
          apiKey: "AIzaSyBQGEWDpTU5pHLhlo9yaD554Nm2wwCW78I",
          authDomain: "training-c598c.firebaseapp.com",
          databaseURL: "https://training-c598c.firebaseio.com",
          storageBucket: "training-c598c.appspot.com",
          messagingSenderId: "673667514988"
        };

    firebase.initializeApp(config);


      var storage = firebase.database().ref();
      var authObj = $firebaseAuth(firebase.auth());
      var storageFile = firebase.storage().ref();
      var CURSOR = [];

      var database = {};

      //funcion que inicia la sesion en el firebase
      var iniciarSesion = function (email, password){

        authObj.$signInWithEmailAndPassword(email, password)
          .then(function (user) {
            //$rootScope.cargarRolPermisos(email);
            $state.go("template1");
            console.log("autenticación exitosa");
          })
          .catch(function (error) {
            mensajeError(error);
          })
      }; 

      var iniciarSesionGoogle = function(){
          $rootScope.ERROR = [];
          
         var provider = new firebase.auth.GoogleAuthProvider();
          
        firebase.auth().signInWithPopup(provider).then(function(result) {

       

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        console.log(user);

        console.log(result);

        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
      };

      var iniciarSesionFacebook = function(){
          $rootScope.ERROR = [];
          
          var provider = new firebase.auth.FacebookAuthProvider();
          
         firebase.auth().signInWithPopup(provider).then(function(result) {

          
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;

          console.log(user);

          console.log(result);

          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
      });

      };

      var iniciarSesionGit = function(){
          $rootScope.ERROR = [];
          
         var provider = new firebase.auth.GithubAuthProvider();
          
         firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

      };

       var iniciarSesionTwitter = function(){
          $rootScope.ERROR = [];
          
        var provider = new firebase.auth.TwitterAuthProvider();
          
       firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        var token = result.credential.accessToken;
        var secret = result.credential.secret;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

      };


      //funcion manejo de errores propios del firebase
      var mensajeError = function(error){
        $rootScope.ERROR = [];
        if (error) {
          switch (error.code) {
            case "auth/invalid-email":
              $rootScope.ERROR[$rootScope.ERROR.length] = "El email introducido no es válido.";
              break;
            case "auth/wrong-password":
              $rootScope.ERROR[$rootScope.ERROR.length] = "Contraseña inválida!, intente de nuevo.";
              break;
            case "auth/user-not-found":
              $rootScope.ERROR[$rootScope.ERROR.length] = "El usuario introducido no existe.";
              break;
            case "EMAIL_TAKEN":
              $rootScope.ERROR[$rootScope.ERROR.length] = "El usuario introducido ya existe.";
              break;
            default:
              $rootScope.ERROR[$rootScope.ERROR.length] = "Ocurrio un error inesperado!, codigo de error " + error.code + ".";
          }
        }
      };

    return database = {

      //retornamos el objeto del usuario autenticado
      //null si nadie se ha autenticado
      getUsu: function(){
        var deferred = $q.defer();
        authObj.$onAuthStateChanged(function(authData) {
          if (authData) {
            deferred.resolve(authData);
            //console.log(authData);
          } else {
            deferred.reject(authData);
            //console.log('No authData', authData);
          }
        });
        return deferred.promise;
      },

      //devuelve el objeto que de administracion y autenticacion de usuario
      getManagerAuth: function(){
        return authObj;
      },

      login: function(email, password){
        $rootScope.ERROR = [];
            console.log("login");
            iniciarSesion(email, password);
      },

      loginGoogle: function(){
        $rootScope.ERROR = [];
        console.log("login google");
        iniciarSesionGoogle();
      },

      loginFacebook: function(){
        $rootScope.ERROR = [];
        console.log("login Facebook");
        iniciarSesionFacebook();
      },

      loginGit: function(){
        $rootScope.ERROR = [];
        console.log("login Git");
        iniciarSesionGit();
      },

       loginTwitter: function(){
        $rootScope.ERROR = [];
        console.log("login Twitter");
        iniciarSesionTwitter();
      },
      



      //cerramos la sesion del usuario
      logout: function(){
        //pero antes destruimos todas las referencias como array al firebase
        var count = CURSOR.length;
        for(var i = 0; i < CURSOR.length; i++){
          CURSOR[i].$destroy();
        }
        console.log(count ,"referencias al firebase destruidas");
        //old
        //authObj.$unauth();
        authObj.$signOut();
        $state.go('login');
      },

      //devuelve la referencia a la raiz en BD
      getRoot : function (){
        return storage;
      },

      //devuelve la referencia a la ubicacion path
      getRef : function(path){
        return storage.child(path);
      },

      //devuele un array con todos los elementos que estan en la ubicacion path
      getArray : function(path){
        if (path != null){
          var db = storage.child(path);
          return CURSOR[CURSOR.length] = $firebaseArray(db);
        }
        return null;
      },

      //devuelve un objeto con todos los elementos que estan en la ubicacion path
      getObject : function(path){
        if (path != null){
          var db = storage.child(path);
          return $firebaseObject(db);
        }
        return null;
      },

      //recibe la ruta, la propiedad y valor del objeto buscado
      //devuelve un array con los objetos que concuerdan on el valor buscado
      getRegistrosArray: function(path, child, value){
        var element = storage.child(path).orderByChild(child).equalTo(value);
        return CURSOR[CURSOR.length] = $firebaseArray(element);
      },

      //recibe la ruta, la propiedad y valor del objeto buscado
      //devuelve un objeto con los objetos que concuerdan on el valor buscado
      getRegistrosObject: function(path, child, value){
        var element = storage.child(path).orderByChild(child).equalTo(value);
        return CURSOR[CURSOR.length] = $firebaseObject(element);
      },


      getRegistroRef: function(path, child, value){
        return storage.child(path).orderByChild(child).equalTo(value);
      },

      hayUsuarioLogueado: function(){

        var user = firebase.auth().currentUser;

        if (user) {
          console.log('hay usuario');
        } else {
          console.log('no hay usuario');
          $state.go("login");
        }
      }
    }
  }])

  //factory de Via encargado del manejo de transicion de las vistas
  .factory('Scopes', function ($rootScope) {
    var mem = {};

    return {
      store: function (key, value) {
        $rootScope.$emit('scope.stored', key);
        mem[key] = value;
      },
      get: function (key) {
        return mem[key];
      }
    };
  });