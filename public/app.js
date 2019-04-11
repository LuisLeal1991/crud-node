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
      url: 'http://localhost:3000/peliculas/'+id
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