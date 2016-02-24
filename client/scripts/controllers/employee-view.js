angular.module('miniStore')
.controller('EmployeeViewController', ["$scope", "EmployeeFactory", "$location", "$routeParams", function($scope, EmployeeFactory, $location, $routeParams) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  EmployeeFactory.one($routeParams.id, function(data) {
    $scope.employee = data;
  });
  $scope.edit = function() {
    var payload = {
      employee: pruneEmpty($scope.new_employee),
      location_id: $scope.employee.location._id,
      location: pruneEmpty($scope.new_location)
    };
    EmployeeFactory.edit(payload, $routeParams.id, function(data) {
      $scope.employee = data[0];
      $scope.employee.location = data[1];
      $scope.new_employee = {};
      $scope.new_location = {};
    });
  }
  $scope.remove = function(data) {
    EmployeeFactory.remove(data, function(){
      $location.path("/employees");
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