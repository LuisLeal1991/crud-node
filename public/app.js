var  app = angular.module("app", [])

// GET    /peliculas
// GET    /peliculas/{id}
// POST   /peliculas
// PUT    /peliculas/{id}
// PATCH  /peliculas/{id}
// DELETE /peliculas/{id}
// http://localhost:3000/posts

app.controller("controlador", function ($scope, $http) {
  $scope.nombre = "LISTADO DE PELICULAS"


  var lista = this

  $http({
    method: 'GET',
    url: 'http://localhost:3000/peliculas/'
  }).then(function successCallback(response) {
    
    lista.peliculas = response.data
  }, function errorCallback(response) {

  });


  lista.eliminar = function(id) {

    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/peliculas/' + id
    }).then(function successCallback(response) {
      
      lista.peliculas = response.data
    }, function errorCallback(response) {

    });
  }
})



app.controller("pelicula", function ($scope, $http) {
  $scope.nombre = "PELICULA"

  var url_string = window.location.href
  var url = new URL(url_string).pathname.split('/').pop();
  var id = url;

  var lista = this

  $http({
    method: 'GET',
    url: 'http://localhost:3000/peliculas/' + id
  }).then(function successCallback(response) {

    $scope.nombrePelicula = response.data.nombre
    $scope.director = response.data.director
    $scope.clasificacion = response.data.clasificacion

  }, function errorCallback(response) {

  });
})

app.controller("peliculaAdd", function ($scope, $http) {

  var lista = this

  lista.submit = function($event, peli) {
    $event.preventDefault()

    console.log(peli)
    $http({
      method: 'POST',
      url: 'http://localhost:3000/peliculas/',
      data: {
        nombre: peli.nombre,
        director: peli.director,
        clasificacion: peli.clasificacion,
      }
    }).then(function successCallback(response) {
  
  
    }, function errorCallback(response) {
  
    });
  };

})



app.controller("peliculaEdit", function ($scope, $http) {

  var url_string = window.location.href
  var url = new URL(url_string).pathname.split('/').pop();
  var id = url;

  var lista = this



  $http({
    method: 'GET',
    url: 'http://localhost:3000/peliculas/' + id
  }).then(function successCallback(response) {
    console.log($scope)

    $scope.nombrePelicula = response.data.nombre
    $scope.director = response.data.director
    $scope.clasificacion = response.data.clasificacion

  }, function errorCallback(response) {

  });



  lista.submit = function($event, peli) {
    $event.preventDefault()

    console.log("peli")
    console.log($scope)

    $http({
      method: 'PUT',
      url: 'http://localhost:3000/peliculas/' + id,
      data: {
        nombre: peli.nombre ? peli.nombre: $scope.nombrePelicula,
        director: peli.director ? peli.director: $scope.director,
        clasificacion: peli.clasificacion ? peli.clasificacion: $scope.clasificacion,
      }
    }).then(function successCallback(response) {


    }, function errorCallback(response) {

    });
    
  };

})