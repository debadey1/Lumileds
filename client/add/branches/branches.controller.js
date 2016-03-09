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
    "pruneFactory"
  ];

  function controller(
    $log,
    $routeParams,
    $location,
    branchFactory,
    companyFactory,
    regionFactory,
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
        vm.company = res;
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          branch: {
            company: vm.company_id,
            notes: vm.new_branch.notes
          },
          branch_location: pruneEmpty(vm.branch_location)
        };

        branchFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success(res) {
        $location.path('/company/' + vm.company_id);
      }
    }

    function fail(err) {
      $log.log('Branches Controller XHR Failed: ' + err.data);
    }
  }
})();