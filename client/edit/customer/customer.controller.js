(function () {
  'use strict';

  angular
    .module('app')
    .controller('CustomerController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "customerFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    customerFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;

    vm.customer_id = $routeParams.id;
    vm.company_id = $routeParams.company_id;
    vm.customer = getCustomer();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getCustomer() {
      customerFactory.one(vm.customer_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.customer = res;
        return res;
      }
    }


    function edit() {
      var payload = {
        customer: pruneEmpty(vm.customer)
      };
      
      customerFactory.edit(payload, vm.customer_id)
        .then(success)
        .catch(fail);

      function success(res) {
        getCustomer();
        toastrFactory.success("Edit success!");
      }
    }

    function remove(data) {
      customerFactory.remove(data._id)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/company/" + vm.company_id);
      }
    }

    function fail(err) {
      $log.log('Customer Controller XHR Failed: ' + err.data);
    }
  }
})();