angular.module('miniStore')
.factory('AirportFactory', ["$http", function($http) {
  var factory = {};
  factory.add = function(payload, callback) {
    $http.post('/airports', payload)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(data, callback) {
    $http.delete('/airports/'+ data._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }

  return factory;
  // factory.all = function(callback) {
  //   $http.get('/airports')
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
  // factory.one = function(id, callback) {
  //   $http.get('/airports/' + id)
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
  // factory.edit = function(payload, id, callback) {
  //   $http.post('/airports/' + id, payload)
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
}]);