(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchesController', controller);

  controller.$inject = [
    "$log",
    "$routeParams",
    "$location",
    "branchFactory",
    "companyFactory",
    "regionFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $routeParams,
    $location,
    branchFactory,
    companyFactory,
    regionFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
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
        vm.company = res.data;
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          branch: {
            company: vm.company_id,
            notes: vm.notes
          },
          branch_location: pruneEmpty(vm.branch_location)
        };

        branchFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success(res) {
        toastrFactory.success("Added branch!");
        $location.path('/company/' + vm.company_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Branches Controller XHR Failed: ' + err.data);
    }
  }
})();