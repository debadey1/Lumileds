(function () {
  'use strict';

  angular
    .module('app')
    .controller('CustomersController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "customerFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    customerFactory
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
        $location.path('/company/' + vm.company_id);
      }
    }

    function fail(err) {
      $log.log('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();