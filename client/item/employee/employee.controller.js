(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeeController', controller);

  controller.$inject = [
    "$location",
    "$routeParams",
    "employeeFactory",
    "pruneFactory",
    "regionFactory"
  ];

  function controller(
    $location,
    $routeParams,
    employeeFactory,
    pruneFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.employee_id = $routeParams.id;
    vm.employee = getEmployee();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getEmployee() {
      employeeFactory.one(vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employee = res;
      }
    }

    function edit() {
      var payload = {
        employee: pruneEmpty(vm.new_employee),
        location_id: vm.employee.location._id,
        location: pruneEmpty(vm.new_location)
      };
      employeeFactory.edit(payload, vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employee = res[0];
        vm.employee.location = res[1];
        vm.new_employee = {};
        vm.new_location = {};
      }
    }

    function remove(data) {
      employeeFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/employees");
      }
    }

    function fail(err) {
      alert('Employee Controller XHR Failed: ' + err.data);
    }
  }
})();