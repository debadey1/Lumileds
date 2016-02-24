angular.module('miniStore')
.controller('TripViewController', ["$scope", "TripFactory", "$location", "$routeParams", "CompanyFactory", "EmployeeFactory", function($scope, TripFactory, $location, $routeParams, CompanyFactory, EmployeeFactory) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  TripFactory.one($routeParams.id, function(data) {
    $scope.trip = data;
  });
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  EmployeeFactory.all(function(data) {
    $scope.employees = data;
    for (var i = 0; i < $scope.trip.employees.length; i++) {
      for (var j = 0; j < $scope.employees.length; j++) {
        if ($scope.employees[j]._id === $scope.trip.employees[i]._id) {
          $scope.employees.splice(j, 1);
        }
      }
    }
  });
  $scope.edit = function() {
    for (var i = 0; i < $scope.add_employees.length; i++) {
      $scope.add_employees[i] = $scope.add_employees[i]._id;
    }
    for (var i = 0; i < $scope.remove_employees.length; i++) {
      $scope.remove_employees[i] = $scope.remove_employees[i]._id;
    }

    var payload = {
      trip: pruneEmpty($scope.new_trip),
      add_employees: pruneEmpty($scope.add_employees),
      remove_employees: pruneEmpty($scope.remove_employees)
    };
    TripFactory.edit(payload, $routeParams.id, function() {
      TripFactory.one($routeParams.id, function(data) {
        $scope.trip = data;
      });
      $scope.new_trip = {};
      EmployeeFactory.all(function(data) {
        $scope.employees = data;
        for (var i = 0; i < $scope.trip.employees.length; i++) {
          for (var j = 0; j < $scope.employees.length; j++) {
            if ($scope.employees[j]._id === $scope.trip.employees[i]._id) {
              $scope.employees.splice(j, 1);
            }
          }
        }
      });
    });
  }
  $scope.remove = function(data) {
    TripFactory.remove(data, function(){
      $location.path("/trips");
    });
  }

  function pruneEmpty(obj) {
    return function prune(current) {
      _.forOwn(current, function (value, key) {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(prune(value)))) {

          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete 
      // operation on an array
      if (_.isArray(current)) _.pull(current, undefined);

      return current;

    }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
  }
}]);