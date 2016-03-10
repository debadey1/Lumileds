(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "companyFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    companyFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;

    vm.company_id = $routeParams.id;
    vm.company = getCompany();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getCompany() {
      companyFactory.one(vm.company_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.company = res;
      }
    }

    function edit() {
      var payload = {
        company: pruneEmpty(vm.company)
      };
      companyFactory.edit(payload, vm.company_id)
        .then(success)
        .catch(fail);

      function success() {
        getCompany();
        vm.new_company = {};
        toastrFactory.success("Edit success!");
      }
    }

    function remove(data) {
      companyFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/companies");
      }
    }

    function fail(err) {
      alert('Company Controller XHR Failed: ' + err.data);
    }
  }
})();