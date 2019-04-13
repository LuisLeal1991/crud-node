var app = angular.module("app", [])

// GET    /peliculas
// GET    /peliculas/{id}
// POST   /peliculas
// PUT    /peliculas/{id}
// PATCH  /peliculas/{id}
// DELETE /peliculas/{id}
// http://localhost:3000/posts


app.factory('peliculasApi', function($http) {
  var url =  "http://localhost:3000"

  return {
    listPeliculas: function() {
      return $http({
        method: 'GET',
        url: url + '/peliculas/'
      })
    },
    eliminarPelicula: function(id) {
      return $http({
        method: 'DELETE',
        url: url + '/peliculas/' + id
      })
    },
    peliculaById: function(id) {
      return $http({
        method: 'GET',
        url: url + '/peliculas/' + id
      })
    },
    peliculaAdd: function(data) {
      return $http({
        method: 'POST',
        url: url + '/peliculas/',
        data: data
      })
    },
    peliculaEdit: function(id, data) {
      return $http({
        method: 'PUT',
        url: url + '/peliculas/' + id,
        data: data
      })
    }
  }
});


app.controller("controlador", function ($scope, $http, peliculasApi ) {
  $scope.nombre = "LISTADO DE PELICULAS"

  var lista = this

  peliculasApi.listPeliculas().then(function successCallback(response) {
    
    lista.peliculas = response.data
  }, function errorCallback(response) {

  });


  lista.eliminar = function(id) {

    peliculasApi.eliminarPelicula(id).then(function successCallback(response) {
      
      peliculasApi.listPeliculas().then(function successCallback(response) {
    
        lista.peliculas = response.data
      }, function errorCallback(response) {
    
      });
    
    }, function errorCallback(response) {

    });
  }
})



app.controller("pelicula", function ($scope, $http, peliculasApi) {
  $scope.nombre = "PELICULA"

  var url_string = window.location.href
  var url = new URL(url_string).pathname.split('/').pop();
  var id = url;

  var lista = this

  peliculasApi.peliculaById(id).then(function successCallback(response) {

    $scope.nombrePelicula = response.data.nombre
    $scope.director = response.data.director
    $scope.clasificacion = response.data.clasificacion

  }, function errorCallback(response) {

  });
})

app.controller("peliculaAdd", function ($scope, $http, peliculasApi) {

  var lista = this

  lista.submit = function($event, peli) {
    $event.preventDefault()

    peliculasApi.peliculaAdd({
      nombre: peli.nombre,
      director: peli.director,
      clasificacion: peli.clasificacion,
    }).then(function successCallback(response) {
  
    }, function errorCallback(response) {
  
    });
  };
})


app.controller("peliculaEdit", function ($scope, $http, peliculasApi) {

  var url_string = window.location.href
  var url = new URL(url_string).pathname.split('/').pop();
  var id = url;

  var lista = this

  peliculasApi.peliculaById(id).then(function successCallback(response) {
    console.log($scope)

    $scope.nombrePelicula = response.data.nombre
    $scope.director = response.data.director
    $scope.clasificacion = response.data.clasificacion

  }, function errorCallback(response) {

  });


  lista.submit = function($event, peli) {
    $event.preventDefault()

    var data = {
      nombre: peli.nombre ? peli.nombre: $scope.nombrePelicula,
      director: peli.director ? peli.director: $scope.director,
      clasificacion: peli.clasificacion ? peli.clasificacion: $scope.clasificacion,
    }

    peliculasApi.peliculaEdit(id, data).then(function successCallback(response) {

    }, function errorCallback(response) {

    });
    
  };
})