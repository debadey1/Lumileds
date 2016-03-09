(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesController', controller);

  controller.$inject = [
    "$location",
    "companyFactory",
    "employeeFactory",
    "regionFactory"
  ];

  function controller(
    $location,
    companyFactory,
    employeeFactory,
    regionFactory
  ) {
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.employees = getEmployees();

    vm.add = add;
    vm.view = view;
    //////////


    function getEmployees() {
      employeeFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employees = res;
      }
    }

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
        getEmployees();
        vm.new_employee = {};
        vm.new_location = {};
      }
    }

    function view(data) {
      $location.path('/employee/lumileds/' + data._id);
    }

    function fail(err) {
      alert('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();