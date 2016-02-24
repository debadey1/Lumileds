(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchController', controller);

  controller.$inject = [
    "$location",
    "branchFactory",
    "companyFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
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
    vm.branch = getBranches();
    vm.companies = getCompanies();

    vm.add = add;
    vm.remove = remove;
    vm.view = view;
    //////////


    function getBranches() {
      branchFactory.one(branch_id)
        .then(getSucceeded)
        .catch(fail);

      function getSucceeded(res) {
        vm.branches = res;
      }
    }

    function getCompanies() {
      companyFactory.all(branch_id)
        .then(getSucceeded)
        .catch(fail);

      function getSucceeded(res) {
        vm.companies = res;
      }
    }

    function add() {
      var payload = {
        branch: pruneEmpty(vm.new_branch),
        branch_location: pruneEmpty(vm.branch_location)
      };

      BranchFactory.add(payload, function() {
        getBranches();
        vm.new_branch = {};
        vm.branch_location = {};
      });
    }
    
    function remove(data) {
      BranchFactory.remove(data, function(){
        vm.branches.splice(vm.branches.indexOf(data), 1);
      });
    }

    function view(data) {
      $location.path('/branch/' + data._id);
    }

    function fail(err) {
      alert('Branch Controller XHR Failed: ' + err.data);
    }
  }
})();