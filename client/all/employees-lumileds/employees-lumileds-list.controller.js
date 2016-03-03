(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesLumiledsListController', controller);

  controller.$inject = [
    "$location",
    "employeeFactory"
  ];

  function controller(
    $location,
    employeeFactory
  ) {
    /* jshint validthis: true */
    var vm = this;

    vm.employees = getEmployees();

    vm.view = view;
    //////////


    function getEmployees() {
      employeeFactory.getLumiledsEmployees()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employees = res;
      }
    }

    function view(data) {
      $location.path('/employee/lumileds/' + data._id);
    }

    function fail(err) {
      alert('Employees List Controller XHR Failed: ' + err.data);
    }
  }
})();