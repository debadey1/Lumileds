angular.module('miniStore')
.controller('TripController', ["$scope", "TripFactory", "CompanyFactory", "EmployeeFactory", "$location", function($scope, TripFactory, CompanyFactory, EmployeeFactory, $location) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  EmployeeFactory.all(function(data) {
    $scope.employees = data;
  });
  TripFactory.all(function(data) {
    $scope.trips = data;
  });

  $scope.add = function() {
    TripFactory.add($scope.new_trip, function() {
      TripFactory.all(function(data) {
        $scope.trips = data;
      });
      $scope.new_trip = {};
      EmployeeFactory.all(function(data) {
        $scope.employees = data;
      });
    });
  }
  $scope.remove = function(data) {
    TripFactory.remove(data, function(){
      $scope.trips.splice($scope.trips.indexOf(data), 1);
    });
  }
  $scope.view = function(data) {
    $location.path('/trip/' + data._id);
  }
}]);