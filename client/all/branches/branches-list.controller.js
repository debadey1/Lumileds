(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchesListController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "branchFactory"
  ];

  function controller(
    $log,
    $location,
    branchFactory
  ) {
    var vm = this;

    vm.predicate = "company.name";
    vm.reverse = false;

    vm.order = order;
    vm.view = view;

    initialize();
    //////////

    function initialize() {
      getBranches();
    }

    function getBranches() {
      branchFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branches = res.data;
      }
    }

    function order(p) {
      vm.reverse = (vm.predicate === p) ? !vm.reverse : false;
      vm.predicate = p;
    }

    function view(branch_id, company_id) {
      $location.path('/company/' + company_id + '/branch/' + branch_id);
    }

    function fail(err) {
      $log.log('Branches List Controller XHR Failed: ' + err.data);
    }
  }
})();