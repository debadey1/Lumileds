(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeeController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "$routeParams",
    "companyFactory",
    "employeeFactory",
    "pruneFactory",
    "regionFactory"
  ];

  function controller(
    $q,
    $log,
    $location,
    $routeParams,
    companyFactory,
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
      var promises = [
        employeeFactory.one(vm.employee_id),
        companyFactory.all()
      ];

      $q.all(promises)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employee = res[0];
        vm.employee.lumileds = vm.employee.lumileds ? true : false;
        vm.companies = res[1];

        return res;
      }
    }


    function edit() {
      var location = vm.employee.location;
      delete vm.employee.location;
      vm.employee.company = vm.new_company;
      
      var payload = {
        employee: pruneEmpty(vm.employee),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      // set to string, to use for angular filters
      // do it after pruning
      if (payload.employee.lumileds) {
        payload.employee.lumileds = "Lumileds";
        payload.employee.company = null;
      } else {
        payload.employee.lumileds = "";
      }
      
      employeeFactory.edit(payload, vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        getEmployee();
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