(function () {
  'use strict';

  angular
    .module('app')
    .controller('VisitsController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "visitFactory",
    "companyFactory",
    "employeeFactory",
    "toastrFactory",
    "regionFactory"
    // "multiselectFactory",
  ];

  function controller(
    $q,
    $log,
    $location,
    visitFactory,
    companyFactory,
    employeeFactory,
    toastrFactory,
    regionFactory
    // multiselectFactory,
  ) {
    var vm = this;
    vm.regions = regionFactory.regions;
    // vm.selectProps = multiselectFactory.selectProps("Add Attendees");
    vm.branchesToVisit = [],
    vm.execs = [];

    vm.add = add;
    vm.getCompanyBranches = getCompanyBranches;

    initialize();
    //////////

    function initialize() {

      var promises = [
        companyFactory.all(),
        employeeFactory.executives()
      ];

      $q.all(promises)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res[0].data;
        vm.execs = res[1].data;
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          visit: vm.visit
        };

        visitFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        toastrFactory.success("Added visit!");
        vm.visit = {};
      }
    }

    // gets branches for the dropdown of each visit after a user selects a company
    function getCompanyBranches(company_id, index) {
      // reset branch
      delete vm.visit.branch;

      for (var i = 0; i < vm.companies.length; i++) {
        if (company_id === vm.companies[i]._id) {
          if (vm.companies[i].branches.length > 0) {
            vm.branchesToVisit = vm.companies[i].branches;
          }
        }
      }
    }

    function fail(err) {
      toastrFactory.error(err.data.errors.name.message);
      $log.log('Visits Controller XHR Failed: ' + err.data);
    }
  }
})();