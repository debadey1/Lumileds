(function () {
  'use strict';

  angular
    .module('app')
    .controller('CustomersController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "customerFactory",
    "toastrFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    customerFactory,
    toastrFactory
  ) {
    var vm = this;

    vm.company_id = $routeParams.company_id;

    vm.add = add;
    //////////
    
    function add(isValid) {
      if (isValid) {
        var payload = {
          customer: vm.new_customer
        };

        payload.customer.company = vm.company_id;

        customerFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        toastrFactory.success("Added company employee!");
        $location.path('/company/' + vm.company_id);
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();