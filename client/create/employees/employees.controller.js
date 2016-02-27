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
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.employees = getEmployees();
    vm.companies = getCompanies();

    vm.new_employee = {
      lumileds: false //initialize lumileds
    };

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

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res;
      }
    }

    function add() {
      if (vm.new_employee.lumileds) {
        vm.new_employee.lumileds = "Lumileds";
        delete vm.new_employee.company;
      }
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

    function view(data) {
      $location.path('/employee/' + data._id);
    }

    function fail(err) {
      alert('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();