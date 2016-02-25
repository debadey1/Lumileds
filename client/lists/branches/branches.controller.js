(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchesController', controller);

  controller.$inject = [
    "$routeParams",
    "$location",
    "branchFactory",
    "companyFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
    branchFactory,
    companyFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.id;
    vm.branches = getBranches();
    vm.companies = getCompanies();

    vm.add = add;
    vm.remove = remove;
    vm.view = view;
    //////////


    function getBranches() {
      branchFactory.all(vm.branch_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branches = res;
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
      var payload = {
        branch: pruneEmpty(vm.new_branch),
        branch_location: pruneEmpty(vm.branch_location)
      };

      branchFactory.add(payload)
        .then(success)
        .catch(fail);

      function success(res) {
        getBranches();
        vm.new_branch = {};
        vm.branch_location = {};
      }
    }
    
    function remove(data) {
      branchFactory.remove(data)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branches.splice(vm.branches.indexOf(data), 1);
      }
    }

    function view(data) {
      $location.path('/branch/' + data._id);
    }

    function fail(err) {
      alert('Branches Controller XHR Failed: ' + err.data);
    }
  }
})();