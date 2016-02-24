(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchViewController', controller);

  controller.$inject = [
    "$location",
    "$routeParams",
    "$anchorScroll",
    "branchFactory",
    "companyFactory",
    "airportFactory",
    "hotelFactory",
    "restaurantFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $location,
    $routeParams,
    $anchorScroll,
    branchFactory,
    companyFactory,
    airportFactory,
    hotelFactory,
    restaurantFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.id;
    vm.branch = getBranch();
    vm.companies = getCompanies();

    vm.edit = edit;
    vm.remove = remove;
    vm.addAirport = addAirport;
    vm.addHotel = addHotel;
    vm.addRestaurant = addRestaurant;
    vm.removeAirport = removeAirport;
    vm.removeHotel = removeHotel;
    vm.removeRestaurant = removeRestaurant;
    vm.scrollTo = scrollTo;
    //////////

    function getBranch() {
      branchFactory.one(branch_id)
        .then(getSucceeded)
        .catch(fail);

      function getSucceeded(res) {
        vm.branch = res;
      }
    }

    function getCompanies() {
      companyFactory.all(branch_id)
        .then(getSucceeded)
        .catch(fail);

      function getSucceeded(res) {
        vm.companies = res;
      }
    }

    function edit() {
      var payload = {
        branch: pruneEmpty(vm.new_branch),
        location_id: vm.branch.location._id,
        location: pruneEmpty(vm.branch_location)
      };
      branchFactory.edit(payload, branch_id, function() {
        getBranch();
        vm.new_branch = {};
        vm.branch_location = {};
      });
    }

    function remove(data) {
      branchFactory.remove(data, function(){
        $location.path("/branches");
      });
    }

    function addAirport() {
      var payload = {
        airport: pruneEmpty(vm.new_airport),
        location: pruneEmpty(vm.airport_location),
        branch_id: branch_id
      };
      airportFactory.add(payload, function() {
        getBranch();
        vm.new_airport = {};
        vm.airport_location = {};
      });
    }

    function addHotel() {
      var payload = {
        hotel: pruneEmpty(vm.new_hotel),
        location: pruneEmpty(vm.hotel_location),
        branch_id: branch_id
      };
      hotelFactory.add(payload, function() {
        getBranch();
        vm.new_hotel = {};
        vm.hotel_location = {};
      });
    }

    function addRestaurant() {
      var payload = {
        restaurant: pruneEmpty(vm.new_restaurant),
        location: pruneEmpty(vm.restaurant_location),
        branch_id: branch_id
      };
      restaurantFactory.add(payload, function() {
        getBranch();
        vm.new_restaurant = {};
        vm.restaurant_location = {};
      });
    }

    function removeAirport(data) {
      airportFactory.remove(data, function(){
        getBranch();
      });
    }

    function removeHotel(data) {
      hotelFactory.remove(data, function(){
        getBranch();
      });
    }

    function removeRestaurant(data) {
      restaurantFactory.remove(data, function(){
        getBranch();
      });
    }

    function scrollTo(id) {
      var old = $location.hash();
      $location.hash(id);
      $anchorScroll();
      //reset to old to keep any additional routing logic from kicking in
      $location.hash(old);
    };

    function fail(err) {
      alert('Branch View Controller XHR Failed: ' + err.data);
    }
  }
})();