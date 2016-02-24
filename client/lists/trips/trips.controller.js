(function () {
  'use strict';

  angular
    .module('app')
    .controller('TripsController', controller);

  controller.$inject = [
    "$location",
    "tripFactory",
    "companyFactory",
    "employeeFactory",
    "regionFactory"
  ];

  function controller(
    $location,
    tripFactory,
    companyFactory,
    employeeFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.companies = getCompanies();
    vm.employees = getEmployees();
    vm.trips = getTrips();

    vm.add = add;
    vm.remove = remove;
    vm.view = view;
    //////////

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res;
      }
    }

    function getEmployees() {
      employeeFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employees = res;
      }
    }

    function getTrips() {
      tripFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.trips = res;
      }
    }

    function add() {
      tripFactory.add(vm.new_trip)
        .then(success)
        .catch(fail);

      function success() {
        getTrips();
        vm.new_trip = {};
        getEmployees();
      }
    }
    
    function remove(data) {
      tripFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        vm.trips.splice(vm.trips.indexOf(data), 1);
      }
    }

    function view(data) {
      $location.path('/trip/' + data._id);
    }

    function fail(err) {
      alert('Trips Controller XHR Failed: ' + err.data);
    }
  }
})();