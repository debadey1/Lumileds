angular.module('miniStore')
.factory('EmployeeFactory', ["$http", function($http) {
  var factory = {};
  factory.all = function(callback) {
    $http.get('/employees')
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.one = function(id, callback) {
    $http.get('/employees/' + id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.edit = function(payload, id, callback) {
    $http.post('/employees/' + id, payload)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.add = function(payload, callback) {
    $http.post('/employees', payload)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(employee, callback) {
    $http.delete('/employees/'+ employee._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
}]);