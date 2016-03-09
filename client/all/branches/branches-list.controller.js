(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchesListController', controller);

  controller.$inject = [
    "$location",
    "branchFactory"
  ];

  function controller(
    $location,
    branchFactory
  ) {
    var vm = this;

    vm.branches = getBranches();

    vm.view = view;
    //////////


    function getBranches() {
      branchFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branches = res;
      }
    }

    function view(branch_id, company_id) {
      $location.path('/company/' + company_id + '/branch/' + branch_id);
    }

    function fail(err) {
      alert('Branches List Controller XHR Failed: ' + err.data);
    }
  }
})();