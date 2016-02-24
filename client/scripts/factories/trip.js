angular.module('miniStore')
.factory('TripFactory', ["$http", function($http) {
  var factory = {};
  factory.all = function(callback) {
    $http.get('/trips')
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.one = function(id, callback) {
    $http.get('/trips/' + id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.edit = function(payload, id, callback) {
    $http.post('/trips/' + id, payload)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.add = function(new_trip, callback) {
    $http.post('/trips', new_trip)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(trip, callback) {
    $http.delete('/trips/'+ trip._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
}]);