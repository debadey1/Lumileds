(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "companyFactory",
    "employeeFactory",
    "regionFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    companyFactory,
    employeeFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.company_id = $routeParams.company_id;

    vm.add = add;

    getCompany();
    //////////

    function getCompany() {
      companyFactory.one(vm.company_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.company = res;
      }
    }
    
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