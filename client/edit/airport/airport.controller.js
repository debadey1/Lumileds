(function () {
  'use strict';

  angular
    .module('app')
    .controller('AirportController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "branchFactory",
    "airportFactory",
    "regionFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    branchFactory,
    airportFactory,
    regionFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.airport_id = $routeParams.id;
    vm.airport = getAirport();
    vm.branch = getBranch();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getAirport() {
      airportFactory.one(vm.airport_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.airport = res;
      }
    }

    function getBranch() {
      branchFactory.one(vm.branch_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branch = res;
      }
    }

    function edit() {
      var location = vm.airport.location;
      delete vm.airport.location;

      var payload = {
        airport: pruneEmpty(vm.airport),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      airportFactory.edit(payload, vm.airport_id)
        .then(success)
        .catch(fail);

      function success() {
        getAirport();
        toastrFactory.success("Edit success!");
      }
    }

    function remove(data) {
      airportFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/branch/" + vm.branch_id);
      }
    }

    function fail(err) {
      alert('Airport Controller XHR Failed: ' + err.data);
    }
  }
})();