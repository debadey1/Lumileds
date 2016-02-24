angular.module('miniStore')
.factory('CustomerFactory', ["$http", function($http) {
  var factory = {};
  factory.all = function(callback) {
    $http.get('/customers')
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.one = function(id, callback) {
    $http.get('/customers/' + id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.add = function(new_customer, callback) {
    $http.post('/customers', new_customer)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.edit = function(payload, id, callback) {
    $http.post('/customers/' + id, payload)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.remove = function(customer, callback) {
    $http.delete('/customers/'+ customer._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
}]);