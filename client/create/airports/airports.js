(function () {
  'use strict';

  angular
    .module('app')
    .controller('AirportsController', controller);

  controller.$inject = [
    "$routeParams",
    "$location",
    "airportFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
    airportFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.airports = getAirports();

    vm.add = add;
    vm.view = view;
    //////////


    function getAirports() {
      airportFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.airports = res;
      }
    }

    function add() {
      var payload = {
        airport: pruneEmpty(vm.new_airport),
        location: pruneEmpty(vm.new_location),
        branch_id: vm.branch_id
      };

      airportFactory.add(payload)
        .then(success)
        .catch(fail);

      function success() {
        getAirports();
        vm.new_airport = {};
        vm.new_location = {};
      }
    }

    function view(data) {
      $location.path('/branch/' + vm.branch_id + '/airport/' + data._id);
    }

    function fail(err) {
      alert('Airports Controller XHR Failed: ' + err.data);
    }
  }
})();