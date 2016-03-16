(function () {
  'use strict';

  angular
    .module('app')
    .controller('VisitController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "$routeParams",
    "visitFactory",
    "companyFactory",
    "employeeFactory",
    "toastrFactory",
    "pruneFactory"
  ];

  function controller(
    $q,
    $log,
    $location,
    $routeParams,
    visitFactory,
    companyFactory,
    employeeFactory,
    toastrFactory,
    pruneFactory
  ) {
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;

    vm.visit_id = $routeParams.id;
    vm.visit = {},
    vm.branchesToVisit = [],
    vm.execs = [];

    vm.editVisit = editVisit;
    vm.removeExec = removeExec;
    vm.addExec = addExec;
    vm.remove = remove;
    vm.getCompanyBranches = getCompanyBranches;

    initialize();
    //////////

    function initialize() {
      visitFactory.one(vm.visit_id)
        .then(getVisitSuccess)
        .then(getOthersSuccess)
        .catch(fail);

      function getVisitSuccess(res) {
        vm.visit = res.data;
        vm.visit.date = new Date(vm.visit.date);

        var promises = [
          companyFactory.all(),
          employeeFactory.executives()
        ];

        return $q.all(promises);
      }

      function getOthersSuccess(res) {
        vm.companies = res[0].data;
        vm.execs = res[1].data;

        // sort execs into attendees and non-attendees
        for (var i = 0; i < vm.visit.executives.length; i++) {
          for (var j = 0; j < vm.execs.length; j++) {
            if (vm.execs[j]._id === vm.visit.executives[i]._id) {
              vm.execs.splice(j, 1);
            }
          }
        }
      }
    }

    function editVisit(isValid) {
      if (isValid) {
        vm.visit.company = vm.new_company;
        vm.visit.branch = vm.new_branch;

        var payload = {
          visit: pruneEmpty(vm.visit)
        };

        visitFactory.edit(payload, vm.visit_id)
          .then(success)
          .catch(fail);

        function success() {
          toastrFactory.success("Visit successfully edited.");
          initialize();
        }
      }
    }

    function removeExec(id) {
      visitFactory.removeExec(vm.visit_id, id)
        .then(success)
        .catch(fail);

      function success(res) {
        initialize();
      }
    }

    function addExec(id) {
      visitFactory.addExec(vm.visit_id, id)
        .then(success)
        .catch(fail);

      function success(res) {
        initialize();
      }
    }

    function remove(payload) {
      visitFactory.remove(payload, vm.visit_id)
        .then(success)
        .catch(fail);

      function success(res) {
        toastrFactory.success("Visit successfully removed.");
        $location.path("/reports/visits-per-exec");
      }
    }

    // gets branches for the dropdown of each visit after a user selects a company
    function getCompanyBranches(company_id) {
      vm.new_branch = null;
      vm.branchesToVisit = [];
      for (var i = 0; i < vm.companies.length; i++) {
        if (company_id === vm.companies[i]._id) {
          vm.branchesToVisit = vm.companies[i].branches;
        }
      }
    }

    function fail(err) {
      $log.log('Visit Controller XHR Failed: ', err.data);
      toastrFactory.error(err.data.errors.name.message);
    }
  }
})();