(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesListController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "employeeFactory"
  ];

  function controller(
    $log,
    $location,
    employeeFactory
  ) {
    var vm = this;

    vm.employees = getEmployees();

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

    function view(data) {
      $location.path('/employee/lumileds/' + data._id);
    }

    function fail(err) {
      $log.log('Employees List Controller XHR Failed: ' + err.data);
    }
  }
})();