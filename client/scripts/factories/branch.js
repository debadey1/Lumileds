angular.module('miniStore')
.factory('BranchFactory', ["$http", function($http) {
  var factory = {};
  factory.all = function(callback) {
    $http.get('/branches')
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.one = function(id, callback) {
    $http.get('/branches/' + id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.edit = function(payload, id, callback) {
    $http.post('/branches/' + id, payload)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.add = function(payload, callback) {
    $http.post('/branches', payload)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(branch, callback) {
    $http.delete('/branches/'+ branch._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
}]);