angular.module('miniStore')
.controller('BranchViewController', ["$scope", "BranchFactory", "$location", "$routeParams", "$anchorScroll", "CompanyFactory", "AirportFactory", "HotelFactory", "RestaurantFactory", function($scope, BranchFactory, $location, $routeParams, $anchorScroll, CompanyFactory, AirportFactory, HotelFactory, RestaurantFactory) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  BranchFactory.one($routeParams.id, function(data) {
    $scope.branch = data;
  });
  CompanyFactory.all(function (data) {
    $scope.companies = data;
  });

  $scope.edit = function() {
    var payload = {
      branch: pruneEmpty($scope.new_branch),
      location_id: $scope.branch.location._id,
      location: pruneEmpty($scope.branch_location)
    };
    BranchFactory.edit(payload, $routeParams.id, function() {
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
      $scope.new_branch = {};
      $scope.branch_location = {};
    });
  }

  $scope.addAirport = function() {
    var payload = {
      airport: pruneEmpty($scope.new_airport),
      location: pruneEmpty($scope.airport_location),
      branch_id: $routeParams.id
    };
    AirportFactory.add(payload, function() {
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
      $scope.new_airport = {};
      $scope.airport_location = {};
    });
  }

  $scope.addHotel = function() {
    var payload = {
      hotel: pruneEmpty($scope.new_hotel),
      location: pruneEmpty($scope.hotel_location),
      branch_id: $routeParams.id
    };
    HotelFactory.add(payload, function() {
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
      $scope.new_hotel = {};
      $scope.hotel_location = {};
    });
  }

  $scope.addRestaurant = function() {
    var payload = {
      restaurant: pruneEmpty($scope.new_restaurant),
      location: pruneEmpty($scope.restaurant_location),
      branch_id: $routeParams.id
    };
    RestaurantFactory.add(payload, function() {
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
      $scope.new_restaurant = {};
      $scope.restaurant_location = {};
    });
  }

  $scope.remove = function(data) {
    BranchFactory.remove(data, function(){
      $location.path("/branches");
    });
  }

  $scope.removeAirport = function(data) {
    AirportFactory.remove(data, function(){
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
    });
  }

  $scope.removeHotel = function(data) {
    HotelFactory.remove(data, function(){
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
    });
  }

  $scope.removeRestaurant = function(data) {
    RestaurantFactory.remove(data, function(){
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
    });
  }

  $scope.scrollTo = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    //reset to old to keep any additional routing logic from kicking in
    $location.hash(old);
  };

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