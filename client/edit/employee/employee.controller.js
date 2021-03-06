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
    "employeeFactory",
    "pruneFactory",
    "toastrFactory",
    "regionFactory"
  ];

  function controller(
    $q,
    $log,
    $location,
    $routeParams,
    employeeFactory,
    pruneFactory,
    toastrFactory,
    regionFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.employee_id = $routeParams.id;
    vm.employee = getEmployee();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getEmployee() {
      employeeFactory.one(vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employee = res.data;
      }
    }


    function edit() {
      var location = vm.employee.location;
      delete vm.employee.location;
      
      var payload = {
        employee: pruneEmpty(vm.employee),
        location_id: location._id,
        location: pruneEmpty(location)
      };
      
      employeeFactory.edit(payload, vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        toastrFactory.success("Employee successfully edited.");
        getEmployee();
      }
    }

    function remove(data) {
      employeeFactory.remove(data._id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Employee successfully removed.");
        $location.path("/employees/lumileds");
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Employee Controller XHR Failed: ' + err.data);
    }
  }
})();