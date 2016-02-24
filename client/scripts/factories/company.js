angular.module('miniStore')
.factory('CompanyFactory', ["$http", function($http) {
  var factory = {};
  factory.all = function(callback) {
    $http.get('/companies')
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.one = function(id, callback) {
    $http.get('/companies/' + id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.edit = function(payload, id, callback) {
    $http.post('/companies/' + id, payload)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.add = function(new_company, callback) {
    $http.post('/companies', new_company)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(company, callback) {
    $http.delete('/companies/'+ company._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
}]);