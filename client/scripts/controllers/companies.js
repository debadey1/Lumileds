angular.module('miniStore')
.controller('CompanyController', ["$scope", "CompanyFactory", "$location", function($scope, CompanyFactory, $location) {
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  $scope.add = function() {
    var payload = {
      company: $scope.new_company
    }
    CompanyFactory.add(payload, function() {
      CompanyFactory.all(function(data) {
        $scope.companies = data;
      });
      $scope.new_company = {};
    });
  }
  $scope.remove = function(data) {
    CompanyFactory.remove(data, function(){
      $scope.companies.splice($scope.companies.indexOf(data), 1);
    });
  }
  $scope.view = function(data) {
    $location.path('/company/' + data._id);
  }
}]);