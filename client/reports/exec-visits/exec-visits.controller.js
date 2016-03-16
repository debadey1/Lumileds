(function () {
  'use strict';

  angular
    .module('app')
    .controller('ExecVisitsController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "visitFactory",
    "employeeFactory",
    "companyFactory"
  ];

  function controller(
    $log,
    $location,
    visitFactory,
    employeeFactory,
    companyFactory
  ) {
    var vm = this;

    vm.predicate = "date";
    vm.reverse = false;

    vm.order = order;
    vm.getVisits = getVisits;
    vm.view = view;

    initialize();
    //////////

    function initialize() {
      getVisits(true, {});
      getCompanies();
      getEmployees();
    }

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res.data;
      }
    }

    function getEmployees() {
      employeeFactory.executives()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.execs = res.data;
      }
    }

    function getVisits(isValid, payload) {
      if (isValid) {
        visitFactory.execVisits(payload)
          .then(success)
          .catch(fail);
      }

      function success(res) {
        vm.visits = res.data;

        // set dates to be formatted as strings, so that it's searchable via angular
        for (var i = 0; i < vm.visits.length; i++) {
          vm.visits[i].date = moment(vm.visits[i].date).format("MMM Do, YYYY");
        }
      }
    }

    function order(p) {
      vm.reverse = (vm.predicate === p) ? !vm.reverse : false;
      vm.predicate = p;
    }

    function view(id) {
      $location.path('/visit/' + id);
    }

    function fail(err) {
      $log.log('Exec Visits Report Controller XHR Failed: ', err.data);
    }
  }
})();