(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "employeeFactory",
    "regionFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    employeeFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.company_id = $routeParams.company_id;

    vm.add = add;
    //////////

    function add(isValid) {
      if (isValid) {
        var payload = {
          employee: vm.new_employee,
          location: vm.new_location
        };

        payload.employee.company = vm.company_id;

        employeeFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        $location.path('/company/' + vm.company_id);
      }
    }

    function fail(err) {
      $log.log('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();