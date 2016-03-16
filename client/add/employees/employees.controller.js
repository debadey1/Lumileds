(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "employeeFactory",
    "toastrFactory",
    "regionFactory"
  ];

  function controller(
    $log,
    $location,
    employeeFactory,
    toastrFactory,
    regionFactory
  ) {
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.add = add;
    //////////

    function add(isValid) {
      if (isValid) {
        vm.new_employee.lumileds = true;

        var payload = {
          employee: vm.new_employee,
          location: vm.new_location
        };
        employeeFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        toastrFactory.success("Added Lumileds employee!");
        vm.new_employee = {};
        vm.new_location = {};
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();