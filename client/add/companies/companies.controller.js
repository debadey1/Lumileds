(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompaniesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "companyFactory",
    "toastrFactory"
  ];

  function controller(
    $log,
    $location,
    companyFactory,
    toastrFactory
  ) {
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
        var data = res.data;

        vm.companies1 = [], vm.companies2 = [], vm.companies3 = [], vm.companies4 = [];
        for (var i = 0; i < data.length; i++) {
          var x = (i + 4) % 4;
          if (x === 0) {vm.companies1.push(data[i]);}
          else if (x === 1) {vm.companies2.push(data[i]);}
          else if (x === 2) {vm.companies3.push(data[i]);}
          else if (x === 3) {vm.companies4.push(data[i]);}
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

      function success(res) {
        getCompanies();
        vm.new_company = {};
        toastrFactory.success("Added company!");
      }
    }

    function view(data) {
      $location.path('/company/' + data._id);
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Companies Controller XHR Failed: ', err);
    }
  }
})();