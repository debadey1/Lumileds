(function () {
  'use strict';

  angular
    .module('app')
    .controller('TripController', controller);

  controller.$inject = [
    "$location",
    "$routeParams",
    "tripFactory",
    "companyFactory",
    "employeeFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $location,
    $routeParams,
    tripFactory,
    companyFactory,
    employeeFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.trip_id = $routeParams.id;
    vm.trip = getTrip();
    vm.companies = getCompanies();
    vm.employees = getEmployees();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getTrip() {
      tripFactory.one(trip_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.trip = res;
      }
    }

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
        for (var i = 0; i < vm.trip.employees.length; i++) {
          for (var j = 0; j < vm.employees.length; j++) {
            if (vm.employees[j]._id === vm.trip.employees[i]._id) {
              vm.employees.splice(j, 1);
            }
          }
        }
      }
    }

    function edit() {
      for (var i = 0; i < vm.add_employees.length; i++) {
        vm.add_employees[i] = vm.add_employees[i]._id;
      }
      for (var i = 0; i < vm.remove_employees.length; i++) {
        vm.remove_employees[i] = vm.remove_employees[i]._id;
      }

      var payload = {
        trip: pruneEmpty(vm.new_trip),
        add_employees: pruneEmpty(vm.add_employees),
        remove_employees: pruneEmpty(vm.remove_employees)
      };

      tripFactory.edit(payload, company_id)
        .then(success)
        .catch(fail);

      function success() {
        getTrip();
        vm.new_trip = {};
        getEmployees();
      }
    }

    function remove(data) {
      tripFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/trips");
      })
    }

    function fail(err) {
      alert('Trip Controller XHR Failed: ' + err.data);
    }
  }
})();