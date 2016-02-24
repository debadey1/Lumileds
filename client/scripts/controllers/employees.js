angular.module('miniStore')
.controller('EmployeeController', ["$scope", "EmployeeFactory", "$location", function($scope, EmployeeFactory, $location) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  EmployeeFactory.all(function(data) {
    $scope.employees = data;
  });
  
  $scope.add = function() {
    var payload = {
      employee: $scope.new_employee,
      location: $scope.new_location
    };
    EmployeeFactory.add(payload, function() {
      EmployeeFactory.all(function(data) {
        $scope.employees = data;
      });
      $scope.new_employee = {};
      $scope.new_location = {};
    });
  }
  $scope.remove = function(data) {
    EmployeeFactory.remove(data, function(){
      $scope.employees.splice($scope.employees.indexOf(data), 1);
    });
  }

  $scope.view = function(data) {
    $location.path('/employee/' + data._id);
  }
}]);