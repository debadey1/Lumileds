(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "companyFactory",
    "employeeFactory",
    "toastrFactory",
    "regionFactory"
  ];

  function controller(
    $log,
    $location,
    companyFactory,
    employeeFactory,
    toastrFactory,
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
        vm.employees = res.data;
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
        toastrFactory.success("Added Lumileds employee!");
        getEmployees();
        vm.new_employee = {};
        vm.new_location = {};
      }
    }

    function view(data) {
      $location.path('/employee/lumileds/' + data._id);
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();