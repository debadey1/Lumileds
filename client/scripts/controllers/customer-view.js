angular.module('miniStore')
.controller('CustomerViewController', ["$scope", "CustomerFactory", "$location", "$routeParams", "CompanyFactory", function($scope, CustomerFactory, $location, $routeParams, CompanyFactory) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  CustomerFactory.one($routeParams.id, function(data) {
    $scope.customer = data;
  });
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  $scope.edit = function() {
    var payload = {
      customer: pruneEmpty($scope.new_customer)
    };
    CustomerFactory.edit(payload, $routeParams.id, function() {
      CustomerFactory.one($routeParams.id, function(data) {
        $scope.customer = data;
      });
      $scope.new_customer = {};
      $scope.new_location = {};
    });
  }
  $scope.remove = function(data) {
    CustomerFactory.remove(data, function(){
      $location.path("/customers");
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