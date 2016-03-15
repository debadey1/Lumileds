(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "employeeFactory",
    "companyFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    employeeFactory,
    companyFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;

    vm.company_id = $routeParams.id;

    vm.edit = edit;
    vm.remove = remove;
    
    initialize();
    //////////

    function initialize() {
      getCompany();
      getManagers();
    }

    function getCompany() {
      companyFactory.one(vm.company_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.company = res.data;
      }
    }

    function getManagers() {
      employeeFactory.managers()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.managers = res.data;
      }
    }

    function edit() {
      vm.company.manager = vm.new_manager;

      var payload = {
        company: pruneEmpty(vm.company)
      };

      companyFactory.edit(payload, vm.company_id)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Company successfully edited.");
        getCompany();
      }
    }

    function remove(data) {
      companyFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Company successfully removed.");
        $location.path("/companies");
      }
    }

    function fail(err) {
      if (err.data.code === 11000) {
        toastrFactory.error("Already added company.");
      } else {
        toastrFactory.error(err.data.errors.name.message);
      }
      $log.log('Company Controller XHR Failed: ', err.data);
      getCompany();
    }
  }
})();