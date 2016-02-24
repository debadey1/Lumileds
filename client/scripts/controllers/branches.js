angular.module('miniStore')
.controller('BranchController', ["$scope", "CompanyFactory", "BranchFactory", "$location", function($scope, CompanyFactory, BranchFactory, $location) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  BranchFactory.all(function(data) {
    $scope.branches = data;
  });
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  $scope.add = function() {
    var payload = {
      branch: pruneEmpty($scope.new_branch),
      branch_location: pruneEmpty($scope.branch_location)
    };

    BranchFactory.add(payload, function() {
      BranchFactory.all(function(data) {
        $scope.branches = data;
      });
      $scope.new_branch = {};
      $scope.new_airport = {};
      $scope.new_hotel = {};
      $scope.branch_location = {};
      $scope.airport_location = {};
      $scope.hotel_location = {};
    });
  }
  $scope.remove = function(data) {
    BranchFactory.remove(data, function(){
      $scope.branches.splice($scope.branches.indexOf(data), 1);
    });
  }

  $scope.view = function(data) {
    $location.path('/branch/' + data._id);
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