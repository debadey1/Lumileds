(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyController', controller);

  controller.$inject = [
    "$location",
    "companyFactory"
  ];

  function controller(
    $location,
    companyFactory
  ) {
    /* jshint validthis: true */
    var vm = this;

    vm.companies = getCompanies();

    vm.add = add;
    vm.remove = remove;
    vm.view = view;
    //////////

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
        company: vm.new_company
      };

      companyFactory.add(payload, function() {
        getCompanies();
        vm.new_company = {};
      });
    }
    
    function remove(data) {
      companyFactory.remove(data, function(){
        vm.companies.splice(vm.companies.indexOf(data), 1);
      });
    }

    function view(data) {
      $location.path('/company/' + data._id);
    }

    function fail(err) {
      alert('Company Controller XHR Failed: ' + err.data);
    }
  }
})();