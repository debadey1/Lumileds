(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesController', controller);

  controller.$inject = [
    "$location",
    "employeeFactory",
    "regionFactory"
  ];

  function controller(
    $location,
    employeeFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.employees = getEmployees();

    vm.add = add;
    vm.remove = remove;
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

    function add() {
      var payload = {
        employee: vm.new_employee,
        location: vm.new_location
      };
      employeeFactory.add(payload)
        .then(success)
        .catch(fail);

      function success() {
        getEmployees();
        vm.new_employee = {};
        vm.new_location = {};
      }
    }
    
    function remove(data) {
      employeeFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        vm.employees.splice(vm.employees.indexOf(data), 1);
      }
    }

    function view(data) {
      $location.path('/employee/' + data._id);
    }

    function fail(err) {
      alert('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();