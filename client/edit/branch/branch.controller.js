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
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    branchFactory,
    companyFactory,
    regionFactory,
    toastrFactory,
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
        vm.branch = res.data;
        vm.company_id = vm.branch.company._id;
      }
    }

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res.data;
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
        toastrFactory.success("Branch successfully edited.");
        getBranch();
      }
    }

    function remove(data) {
      branchFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        toastrFactory.success("Branch successfully removed.");
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
        toastrFactory.success("Branch successfully edited.");
        getBranch();
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Branch Controller XHR Failed: ' + err.data);
    }
  }
})();