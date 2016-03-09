(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "branchFactory",
    "companyFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    branchFactory,
    companyFactory,
    regionFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.id;
    vm.company_id = $routeParams.company_id;
    vm.branch = getBranch();
    vm.companies = getCompanies();

    vm.edit = edit;
    vm.view = view;
    vm.changeCompany = changeCompany;
    vm.remove = remove;
    //////////

    function getBranch() {
      branchFactory.one(vm.branch_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branch = res;
        vm.company_id = vm.branch.company._id;
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

    function edit() {
      var location = vm.branch.location;
      delete vm.branch.location;

      var payload = {
        branch: pruneEmpty(vm.branch),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      branchFactory.edit(payload, vm.branch_id)
        .then(success)
        .catch(fail);

      function success() {
        getBranch();
      }
    }

    function remove(data) {
      branchFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/branches");
      }
    }

    function view(path) {
      $location.path(path);
    }

    function changeCompany() {
      var payload = {
        branch: {
          company: vm.new_company
        }
      }
      
      branchFactory.changeCompany(payload, vm.branch_id)
        .then(success)
        .catch(fail);

      function success() {
        getBranch();
      }
    }

    function fail(err) {
      $log.log('Branch Controller XHR Failed: ' + err.data);
    }
  }
})();