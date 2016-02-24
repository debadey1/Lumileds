angular.module('miniStore')
.controller('CompanyViewController', ["$scope", "CompanyFactory", "$location", "$routeParams", function($scope, CompanyFactory, $location, $routeParams) {
  
  CompanyFactory.one($routeParams.id, function(data) {
    $scope.company = data;
  });
  $scope.edit = function() {
    var payload = {
      company: pruneEmpty($scope.new_company)
    };
    CompanyFactory.edit(payload, $routeParams.id, function() {
      CompanyFactory.one($routeParams.id, function(data) {
        $scope.company = data;
      });
      $scope.new_company = {};
    });
  }
  $scope.remove = function(data) {
    CompanyFactory.remove(data, function(){
      $location.path("/companies");
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