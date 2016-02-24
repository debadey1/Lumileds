angular.module('miniStore')
.controller('CustomerController', ["$scope", "CompanyFactory", "CustomerFactory", "$location",function($scope, CompanyFactory, CustomerFactory, $location) {
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  CustomerFactory.all(function(data) {
    $scope.customers = data;
  });
  
  $scope.add = function() {
    CustomerFactory.add($scope.new_customer, function() {
      CustomerFactory.all(function(data) {
        $scope.customers = data;
      });
      $scope.new_customer = {};
    });
  }
  $scope.remove = function(data) {
    CustomerFactory.remove(data, function(){
      $scope.customers.splice($scope.customers.indexOf(data), 1);
    });
  }
  $scope.view = function(data) {
    $location.path('/customer/' + data._id);
  }
}]);