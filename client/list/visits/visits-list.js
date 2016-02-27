(function () {
  'use strict';

  angular
    .module('app')
    .controller('VisitsListController', controller);

  controller.$inject = [
    "$location",
    "visitFactory"
  ];

  function controller(
    $location,
    visitFactory
  ) {
    /* jshint validthis: true */
    var vm = this;

    vm.visits = getVisits();

    vm.view = view;
    //////////


    function getVisits() {
      visitFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.visits = res;
      }
    }

    function view(id) {
      $location.path('/visit/' + id);
    }

    function fail(err) {
      alert('Visits List Controller XHR Failed: ' + err.data);
    }
  }
})();