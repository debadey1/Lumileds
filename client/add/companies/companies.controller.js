(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompaniesController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "employeeFactory",
    "companyFactory",
    "toastrFactory"
  ];

  function controller(
    $log,
    $location,
    employeeFactory,
    companyFactory,
    toastrFactory
  ) {
    var vm = this;

    vm.add = add;
    vm.view = view;

    initialize();
    //////////

    function initialize() {
      getManagers();
      getCompanies();
    }

    function getManagers() {
      employeeFactory.managers()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.managers = res.data;
      }
    }

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res.data;
        var data = res.data;
        vm.companies1 = [], vm.companies2 = [];
        for (var i = 0; i < data.length; i++) {
          var x = (i + 2) % 2;
          if (x === 0) {vm.companies1.push(data[i]);}
          else if (x === 1) {vm.companies2.push(data[i]);}
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

    function view(id) {
      $location.path('/company/' + id);
    }

    function fail(err) {
      if (err.data.code === 11000) {
        toastrFactory.error("Already added company.");
      } else {
        toastrFactory.error(err.data.errors.name.message);
      }
      $log.log('Companies Controller XHR Failed: ', err);
    }
  }
})();