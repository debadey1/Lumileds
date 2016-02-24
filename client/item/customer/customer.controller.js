(function () {
  'use strict';

  angular
    .module('app')
    .controller('CustomerController', controller);

  controller.$inject = [
    "$location",
    "$routeParams",
    "customerFactory",
    "companyFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $location,
    $routeParams,
    customerFactory,
    companyFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.customer_id = $routeParams.id;
    vm.customer = getCustomer();
    vm.companies = getCompanies();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getCustomer() {
      customerFactory.one(vm.customer_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.customer = res;
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
      var payload = {
        customer: pruneEmpty(vm.new_customer)
      };
      customerFactory.edit(payload, vm.customer_id)
        .then(success)
        .catch(fail);

      function success(res) {
        getCustomer();
        vm.new_customer = {};
      }
    }

    function remove(data) {
      customerFactory.remove(data)
        .then(success)
        .catch(fail);

      function success(res) {
        $location.path("/customers");
      }
    }

    function fail(err) {
      alert('Customer Controller XHR Failed: ' + err.data);
    }
  }
})();