(function () {
  'use strict';

  angular
    .module('app')
    .controller('CustomersController', controller);

  controller.$inject = [
    "$location",
    "companyFactory",
    "customerFactory"
  ];

  function controller(
    $location,
    companyFactory,
    customerFactory
  ) {
    /* jshint validthis: true */
    var vm = this;

    vm.customers = getCustomers();
    vm.companies = getCompanies();

    vm.add = add;
    vm.remove = remove;
    vm.view = view;
    //////////


    function getCustomers() {
      customerFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.customers = res;
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
      customerFactory.add(vm.new_customer)
        .then(success)
        .catch(fail);

      function success() {
        getCustomers();
        vm.new_customer = {};
      }
    }
    
    function remove(data) {
      customerFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        vm.customers.splice(vm.customers.indexOf(data), 1);
      }
    }

    function view(data) {
      $location.path('/customer/' + data._id);
    }

    function fail(err) {
      alert('Customers Controller XHR Failed: ' + err.data);
    }
  }
})();