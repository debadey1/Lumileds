(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompaniesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "companyFactory"
  ];

  function controller(
    $log,
    $location,
    companyFactory
  ) {
    /* jshint validthis: true */
    var vm = this;

    vm.companies = getCompanies();

    vm.add = add;
    vm.view = view;
    //////////

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies1 = [], vm.companies2 = [], vm.companies3 = [], vm.companies4 = [];
        for (var i = 0; i < res.length; i++) {
          var x = i % 4;
          if (x === 0) {vm.companies1.push(res[i]);}
          else if (x === 1) {vm.companies2.push(res[i]);}
          else if (x === 2) {vm.companies3.push(res[i]);}
          else if (x === 3) {vm.companies4.push(res[i]);}
        }
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          company: vm.new_company
        };

        companyFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        getCompanies();
        vm.new_company = {};
      }
    }

    function view(data) {
      $location.path('/company/' + data._id);
    }

    function fail(err) {
      alert('Companies Controller XHR Failed: ' + err.data);
    }
  }
})();