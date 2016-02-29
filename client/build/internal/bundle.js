(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',
    'isteven-multi-select'
  ]);
})();
(function () {
  'use strict';

  angular
    .module('app')
    .config(routes);

  routes.$inject = [
    '$routeProvider'
  ];

  function routes($routeProvider) {
    $routeProvider
      .when('/',{
          templateUrl: 'create/itineraries/itineraries.html',
          controller: 'ItinerariesController',
          controllerAs: 'vm'
      })
      .when('/employees',{
          templateUrl: 'create/employees/employees.html',
          controller: 'EmployeesController',
          controllerAs: 'vm'
      })
      .when('/itineraries',{
          templateUrl: 'create/itineraries/itineraries.html',
          controller: 'ItinerariesController',
          controllerAs: 'vm'
      })
      .when('/companies',{
          templateUrl: 'create/companies/companies.html',
          controller: 'CompaniesController',
          controllerAs: 'vm'
      })
      .when('/branches',{
          templateUrl: 'create/branches/branches.html',
          controller: 'BranchesController',
          controllerAs: 'vm'
      })

      .when('/employee/:id',{
          templateUrl: 'item/employee/employee.html',
          controller: 'EmployeeController',
          controllerAs: 'vm'
      })
      .when('/visit/:id',{
          templateUrl: 'item/visit/visit.html',
          controller: 'VisitController',
          controllerAs: 'vm'
      })
      .when('/company/:id',{
          templateUrl: 'item/company/company.html',
          controller: 'CompanyController',
          controllerAs: 'vm'
      })
      .when('/branch/:id',{
          templateUrl: 'item/branch/branch.html',
          controller: 'BranchController',
          controllerAs: 'vm'
      })
      .when('/itinerary/:id',{
          templateUrl: 'item/itinerary/itinerary.html',
          controller: 'ItineraryController',
          controllerAs: 'vm'
      })

      .when('/employees/all',{
          templateUrl: 'list/employees/employees-list.html',
          controller: 'EmployeesListController',
          controllerAs: 'vm'
      })
      .when('/branches/all',{
          templateUrl: 'list/branches/branches-list.html',
          controller: 'BranchesListController',
          controllerAs: 'vm'
      })
      .when('/itineraries/all',{
          templateUrl: 'list/itineraries/itineraries-list.html',
          controller: 'ItinerariesListController',
          controllerAs: 'vm'
      })
      .when('/visits/all',{
          templateUrl: 'list/visits/visits-list.html',
          controller: 'VisitsListController',
          controllerAs: 'vm'
      })

      .when('/airports/:branch_id',{
          templateUrl: 'create/airports/airports.html',
          controller: 'AirportsController',
          controllerAs: 'vm'
      })
      .when('/hotels/:branch_id',{
          templateUrl: 'create/hotels/hotels.html',
          controller: 'HotelsController',
          controllerAs: 'vm'
      })
      .when('/restaurants/:branch_id',{
          templateUrl: 'create/restaurants/restaurants.html',
          controller: 'RestaurantsController',
          controllerAs: 'vm'
      })

      .when('/branch/:branch_id/airport/:id',{
          templateUrl: 'item/airport/airport.html',
          controller: 'AirportController',
          controllerAs: 'vm'
      })
      .when('/branch/:branch_id/hotel/:id',{
          templateUrl: 'item/hotel/hotel.html',
          controller: 'HotelController',
          controllerAs: 'vm'
      })
      .when('/branch/:branch_id/restaurant/:id',{
          templateUrl: 'item/restaurant/restaurant.html',
          controller: 'RestaurantController',
          controllerAs: 'vm'
      })

      .when('/itinerary/:itinerary_id/visit/:id',{
          templateUrl: 'item/visit/visit.html',
          controller: 'VisitController',
          controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('AirportsController', controller);

  controller.$inject = [
    "$routeParams",
    "$location",
    "airportFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
    airportFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.airports = getAirports();

    vm.add = add;
    vm.view = view;
    //////////


    function getAirports() {
      airportFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.airports = res;
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          airport: pruneEmpty(vm.new_airport),
          location: pruneEmpty(vm.new_location),
          branch_id: vm.branch_id
        };

        airportFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        getAirports();
        vm.new_airport = {};
        vm.new_location = {};
      }
    }

    function view(data) {
      $location.path('/branch/' + vm.branch_id + '/airport/' + data._id);
    }

    function fail(err) {
      alert('Airports Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchesController', controller);

  controller.$inject = [
    "$routeParams",
    "$location",
    "branchFactory",
    "companyFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
    branchFactory,
    companyFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.id;
    vm.branches = getBranches();
    vm.companies = getCompanies();

    vm.add = add;
    vm.view = view;
    //////////


    function getBranches() {
      branchFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branches = res;
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

    function add(isValid) {
      if (isValid) {
        var payload = {
          branch: pruneEmpty(vm.new_branch),
          branch_location: pruneEmpty(vm.branch_location)
        };

        branchFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success(res) {
        getBranches();
        vm.new_branch = {};
        vm.branch_location = {};
      }
    }

    function view(data) {
      $location.path('/branch/' + data._id);
    }

    function fail(err) {
      alert('Branches Controller XHR Failed: ' + err.data);
    }
  }
})();
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
(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesController', controller);

  controller.$inject = [
    "$location",
    "companyFactory",
    "employeeFactory",
    "regionFactory"
  ];

  function controller(
    $location,
    companyFactory,
    employeeFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.employees = getEmployees();
    vm.companies = getCompanies();

    vm.new_employee = {
      lumileds: false //initialize lumileds
    };

    vm.add = add;
    vm.view = view;
    //////////


    function getEmployees() {
      employeeFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employees = res;
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

    function add(isValid) {
      if (isValid) {
        if (vm.new_employee.lumileds) {
          vm.new_employee.lumileds = "Lumileds";
          delete vm.new_employee.company;
        }
        var payload = {
          employee: vm.new_employee,
          location: vm.new_location
        };
        employeeFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        getEmployees();
        vm.new_employee = {};
        vm.new_location = {};
      }
    }

    function view(data) {
      $location.path('/employee/' + data._id);
    }

    function fail(err) {
      alert('Employees Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('HotelsController', controller);

  controller.$inject = [
    "$routeParams",
    "$location",
    "hotelFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
    hotelFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.hotels = getHotels();

    vm.add = add;
    vm.view = view;
    //////////


    function getHotels() {
      hotelFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.hotels = res;
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          hotel: pruneEmpty(vm.new_hotel),
          location: pruneEmpty(vm.new_location),
          branch_id: vm.branch_id
        };

        hotelFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        getHotels();
        vm.new_hotel = {};
        vm.new_location = {};
      }
    }

    function view(data) {
      $location.path('/branch/' + vm.branch_id + '/hotel/' + data._id);
    }

    function fail(err) {
      alert('Hotels Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ItinerariesController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "visitFactory",
    "itineraryFactory",
    "companyFactory",
    "employeeFactory",
    // "multiselectFactory",
    "regionFactory"
  ];

  function controller(
    $q,
    $log,
    $location,
    visitFactory,
    itineraryFactory,
    companyFactory,
    employeeFactory,
    // multiselectFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;
    // vm.selectProps = multiselectFactory.selectProps("Add Attendees");
    vm.visits = [{}];
    vm.branchesToVisit = [];

    vm.add = add;
    vm.removeVisit = removeVisit;
    vm.view = view;
    vm.getCompanyBranches = getCompanyBranches;

    initialize();
    //////////

    function initialize() {
      getItineraries();

      var promises = [
        companyFactory.all(),
        employeeFactory.getLumiledsEmployees()
      ];

      $q.all(promises)
        .then(success)
        .catch(fail);

      // angular.element(document).ready(function() {
      //   angular.element('select').material_select();
      // });

      function success(res) {
        vm.companies = res[0];
        vm.employees = res[1];
      }
    }

    function getItineraries() {
      itineraryFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itineraries = res;
      }
    }

    function add(isValid) {
      // if you have 0 visits, angular interprets the form to be valid
      if (isValid && vm.visits.length > 0) {
        var payload = {
          visits: vm.visits
        };

        itineraryFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        vm.visits = [{}];
        getItineraries();
      }
    }

    function view(data) {
      $location.path('/itinerary/' + data._id);
    }

    function removeVisit(index) {
      vm.visits.splice(index, 1);
      vm.branchesToVisit.splice(index, 1);
    }

    // gets branches for the dropdown of each visit after a user selects a company
    function getCompanyBranches(company_id, index) {
      vm.branchesToVisit[index] = [];
      for (var i = 0; i < vm.companies.length; i++) {
        if (company_id === vm.companies[i]._id) {
          if (vm.companies[i].branches.length > 0) {
            vm.branchesToVisit[index] = vm.companies[i].branches;
          }
        }
      }
    }

    function fail(err) {
      alert('Visits Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('RestaurantsController', controller);

  controller.$inject = [
    "$routeParams",
    "$location",
    "restaurantFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $routeParams,
    $location,
    restaurantFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.restaurants = getRestaurants();

    vm.add = add;
    vm.view = view;
    //////////


    function getRestaurants() {
      restaurantFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.restaurants = res;
      }
    }

    function add(isValid) {
      if (isValid) {
        var payload = {
          restaurant: pruneEmpty(vm.new_restaurant),
          location: pruneEmpty(vm.new_location),
          branch_id: vm.branch_id
        };

        restaurantFactory.add(payload)
          .then(success)
          .catch(fail);
      }

      function success() {
        getRestaurants();
        vm.new_restaurant = {};
        vm.new_location = {};
      }
    }

    function view(data) {
      $location.path('/branch/' + vm.branch_id + '/restaurant/' + data._id);
    }

    function fail(err) {
      alert('Restaurants Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('airportFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/airports')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/airports/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.post('/airports/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/airports', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/airports/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Airport Factory XHR failed: ', error.data);
    }

  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('branchFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/branches')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/branches/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.post('/branches/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/branches', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/branches/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Branch Factory XHR failed: ', error.data);
    }

  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('companyFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      add: add,
      all: all,
      one: one,
      edit: edit,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/companies')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/companies/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.post('/companies/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/companies', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/companies/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Company Factory XHR failed: ', error.data);
    }

  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('employeeFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      add: add,
      all: all,
      one: one,
      edit: edit,
      remove: remove,
      getLumiledsEmployees: getLumiledsEmployees
    };

    return factory;
    //////////

    function all() {
      return $http.get('/employees')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/employees/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.post('/employees/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/employees', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/employees/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function getLumiledsEmployees() {
      return $http.get('/employees/lumileds')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Employee Factory XHR failed: ', error.data);
    }

  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('hotelFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/hotels')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/hotels/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.post('/hotels/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/hotels', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/hotels/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Hotel Factory XHR failed: ', error.data);
    }

  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('itineraryFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      add: add,
      all: all,
      one: one,
      edit: edit,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/itineraries')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/itineraries/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.put('/itineraries/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/itineraries', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(payload, id) {
      return $http.post('/itineraries/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Itinerary Factory XHR failed: ', error.data);
    }

  }
})();
(function () {
	'use strict';

	angular
		.module('app')
		.factory('multiselectFactory', factory);

	factory.$inject = [];

	function factory() {
		var factory = {
      selectProps: selectProps
    };

    function selectProps(label) {
    	return {
	      selectAll       : "Select all",
	      selectNone      : "Select none",
	      reset           : "Reset",
	      search          : "Search...",
	      nothingSelected : label
	    };
    }

		return factory;
	}
})();
(function () {
	'use strict';

	angular
		.module('app')
		.factory('pruneFactory', factory);

	factory.$inject = ["$log"];

	function factory($log) {
		var factory = {
			pruneEmpty: pruneEmpty
		};

		return factory;
		//////////////

		function pruneEmpty(obj) {
	    return function prune(current) {
	      _.forOwn(current, function (value, key) {
	        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) || (_.isString(value) && _.isEmpty(value)) || (_.isObject(value) && _.isEmpty(prune(value))) && !_.isDate(value)) {
	          delete current[key];
	        }
	      });
	      // remove any leftover undefined values from the delete 
	      // operation on an array
	      if (_.isArray(current)) {
	      	_.pull(current, undefined)
	      };

	      return current;

	    }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
	  }
	}
})();
(function () {
	'use strict';

	angular
		.module('app')
		.factory('regionFactory', factory);

	factory.$inject = [];

	function factory() {
		var factory = {
			regions: [
		    "Americas",
		    "APAC",
		    "EMEA",
		    "Japan"
		  ]
		};

		return factory;
	}
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('restaurantFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      all: all,
      one: one,
      edit: edit,
      add: add,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/restaurants')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/restaurants/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.post('/restaurants/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/restaurants', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/restaurants/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Restaurant Factory XHR failed: ', error.data);
    }

  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .factory('visitFactory', factory);

  factory.$inject = [
    "$http",
    "$log"
  ];

  function factory($http, $log) {
    var factory = {
      add: add,
      all: all,
      one: one,
      edit: edit,
      remove: remove
    };

    return factory;
    //////////

    function all() {
      return $http.get('/visits')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/visits/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.put('/visits/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/visits', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(payload, id) {
      return $http.post('/visits/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response;
      }
    }

    function fail(error) {
      $log.log('Visit Factory XHR failed: ', error.data);
    }

  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('AirportController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "airportFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    airportFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.airport_id = $routeParams.id;
    vm.airport = getAirport();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getAirport() {
      airportFactory.one(vm.airport_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.airport = res;
      }
    }

    function edit() {
      var location = vm.airport.location;
      delete vm.airport.location;

      var payload = {
        airport: pruneEmpty(vm.airport),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      airportFactory.edit(payload, vm.airport_id)
        .then(success)
        .catch(fail);

      function success() {
        getAirport();
      }
    }

    function remove(data) {
      airportFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/branch/" + vm.branch_id);
      }
    }

    function fail(err) {
      alert('Airport Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "branchFactory",
    "companyFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    branchFactory,
    companyFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.id;
    vm.branch = getBranch();
    vm.companies = getCompanies();

    vm.edit = edit;
    vm.view = view;
    vm.remove = remove;
    //////////

    function getBranch() {
      branchFactory.one(vm.branch_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branch = res;
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

    function edit() {
      var location = vm.branch.location;
      delete vm.branch.location;

      vm.branch.company = vm.new_company;

      var payload = {
        branch: pruneEmpty(vm.branch),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      branchFactory.edit(payload, vm.branch_id)
        .then(success)
        .catch(fail);

      function success() {
        getBranch();
      }
    }

    function remove(data) {
      branchFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/branches");
      }
    }

    function view(path) {
      $location.path(path);
    }

    function fail(err) {
      alert('Branch Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "companyFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    companyFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;

    vm.company_id = $routeParams.id;
    vm.company = getCompany();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getCompany() {
      companyFactory.one(vm.company_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.company = res;
      }
    }

    function edit() {
      var payload = {
        company: pruneEmpty(vm.company)
      };
      companyFactory.edit(payload, vm.company_id)
        .then(success)
        .catch(fail);

      function success() {
        getCompany();
        vm.new_company = {};
      }
    }

    function remove(data) {
      companyFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/companies");
      }
    }

    function fail(err) {
      alert('Company Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeeController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "$routeParams",
    "companyFactory",
    "employeeFactory",
    "pruneFactory",
    "regionFactory"
  ];

  function controller(
    $q,
    $log,
    $location,
    $routeParams,
    companyFactory,
    employeeFactory,
    pruneFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.employee_id = $routeParams.id;
    vm.employee = getEmployee();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getEmployee() {
      var promises = [
        employeeFactory.one(vm.employee_id),
        companyFactory.all()
      ];

      $q.all(promises)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employee = res[0];
        vm.employee.lumileds = vm.employee.lumileds ? true : false;
        vm.companies = res[1];

        return res;
      }
    }


    function edit() {
      var location = vm.employee.location;
      delete vm.employee.location;
      vm.employee.company = vm.new_company;
      
      var payload = {
        employee: pruneEmpty(vm.employee),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      // set to string, to use for angular filters
      // do it after pruning
      if (payload.employee.lumileds) {
        payload.employee.lumileds = "Lumileds";
        payload.employee.company = null;
      } else {
        payload.employee.lumileds = "";
      }
      
      employeeFactory.edit(payload, vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        getEmployee();
      }
    }

    function remove(data) {
      employeeFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/employees");
      }
    }

    function fail(err) {
      alert('Employee Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('HotelController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "hotelFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    hotelFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.hotel_id = $routeParams.id;
    vm.hotel = getHotel();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getHotel() {
      hotelFactory.one(vm.hotel_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.hotel = res;
      }
    }

    function edit() {
      var location = vm.hotel.location;
      delete vm.hotel.location;

      var payload = {
        hotel: pruneEmpty(vm.hotel),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      hotelFactory.edit(payload, vm.hotel_id)
        .then(success)
        .catch(fail);

      function success() {
        getHotel();
      }
    }

    function remove(data) {
      hotelFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/branch/" + vm.branch_id);
      }
    }

    function fail(err) {
      alert('Hotel Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ItineraryController', controller);

  controller.$inject = [
    "$q",
    "$log",
    "$location",
    "$routeParams",
    "visitFactory",
    "itineraryFactory",
    "companyFactory",
    "employeeFactory",
    // "multiselectFactory",
    "regionFactory"
  ];

  function controller(
    $q,
    $log,
    $location,
    $routeParams,
    visitFactory,
    itineraryFactory,
    companyFactory,
    employeeFactory,
    // multiselectFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;
    // vm.selectProps = multiselectFactory.selectProps("Add Attendees");
    var itinerary_id = $routeParams.id;

    vm.visits = [{}];
    vm.branchesToVisit = [];

    vm.edit = edit;
    vm.view = view;
    vm.remove = remove;
    vm.removeVisit = removeVisit;
    vm.getCompanyBranches = getCompanyBranches;

    initialize();
    //////////

    function initialize() {
      getItinerary();

      var promises = [
        companyFactory.all(),
        employeeFactory.getLumiledsEmployees()
      ];

      $q.all(promises)
        .then(success)
        .catch(fail);

      // angular.element(document).ready(function() {
      //   angular.element('select').material_select();
      // });

      function success(res) {
        vm.companies = res[0];
        vm.employees = res[1];
      }
    }

    function getItinerary() {
      itineraryFactory.one(itinerary_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itinerary = res;
      }
    }

    function view(id) {
      $location.path('/itinerary/'+ itinerary_id + '/visit/' + id);
    }

    function remove(data) {
      itineraryFactory.remove(data, itinerary_id)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/itineraries");
      }
    }

    function edit(isValid) {
      // if you have 0 visits, angular interprets the form to be valid
      if (isValid && vm.visits.length > 0) {
        var payload = {
          visits: vm.visits
        };

        itineraryFactory.edit(payload, itinerary_id)
          .then(success)
          .catch(fail);
      }

      function success() {
        vm.visits = [{}];
        getItinerary();
      }
    }

    function removeVisit(index) {
      vm.visits.splice(index, 1);
      vm.branchesToVisit.splice(index, 1);
    }

    // gets branches for the dropdown of each visit after a user selects a company
    function getCompanyBranches(company_id, index) {
      vm.branchesToVisit[index] = [];
      for (var i = 0; i < vm.companies.length; i++) {
        if (company_id === vm.companies[i]._id) {
          if (vm.companies[i].branches.length > 0) {
            vm.branchesToVisit[index] = vm.companies[i].branches;
          }
        }
      }
    }

    function fail(err) {
      alert('Itinerary Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('RestaurantController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "restaurantFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    restaurantFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.branch_id = $routeParams.branch_id;
    vm.restaurant_id = $routeParams.id;
    vm.restaurant = getRestaurant();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getRestaurant() {
      restaurantFactory.one(vm.restaurant_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.restaurant = res;
      }
    }

    function edit() {
      var location = vm.restaurant.location;
      delete vm.restaurant.location;

      var payload = {
        restaurant: pruneEmpty(vm.restaurant),
        location_id: location._id,
        location: pruneEmpty(location)
      };

      restaurantFactory.edit(payload, vm.restaurant_id)
        .then(success)
        .catch(fail);

      function success() {
        getRestaurant();
      }
    }

    function remove(data) {
      restaurantFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/branch/" + vm.branch_id);
      }
    }

    function fail(err) {
      alert('Restaurant Controller XHR Failed: ' + err.data);
    }
  }
})();
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
    "multiselectFactory",
    "regionFactory",
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
    multiselectFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;
    vm.selectPropsAdd = multiselectFactory.selectProps("Add Employees");
    vm.selectPropsRemove = multiselectFactory.selectProps("Remove Employees");

    vm.visit_id = $routeParams.id;
    vm.itinerary_id = $routeParams.itinerary_id;
    vm.getCompanyBranches = getCompanyBranches;

    vm.edit = edit;
    vm.editCompany = editCompany;
    vm.remove = remove;

    initialize();
    //////////

    function initialize() {
      visitFactory.one(vm.visit_id)
        .then(getVisitSuccess)
        .then(getOthersSuccess)
        .catch(fail);

      function getVisitSuccess(res) {
        vm.visit = res;
        vm.visit.date = new Date(vm.visit.date);

        var promises = [
          companyFactory.all(),
          employeeFactory.getLumiledsEmployees()
        ];

        return $q.all(promises);
      }

      function getOthersSuccess(res) {
        vm.companies = res[0];
        vm.employees = res[1];
        for (var i = 0; i < vm.visit.employees.length; i++) {
          for (var j = 0; j < vm.employees.length; j++) {
            if (vm.employees[j]._id === vm.visit.employees[i]._id) {
              vm.employees.splice(j, 1);
            }
          }
        }
      }
    }

    function editCompany(isValid) {
      if (isValid) {
        vm.visit.company = vm.new_company;
        vm.visit.branch = vm.new_branch;

        var payload = {
          visit: pruneEmpty(vm.visit),
          add_employees: [],
          remove_employees: []
        };

        visitFactory.edit(payload, vm.visit_id)
          .then(success)
          .catch(fail);

        function success() {
          initialize();
        }
      }
    }

    function edit() {
      if (vm.add_employees.length > 0) {
        for (var i = 0; i < vm.add_employees.length; i++) {
          vm.add_employees[i] = vm.add_employees[i]._id;
        }
      }
      if (vm.remove_employees.length > 0) {
        for (var i = 0; i < vm.remove_employees.length; i++) {
          vm.remove_employees[i] = vm.remove_employees[i]._id;
        }
      }

      var payload = {
        visit: pruneEmpty(vm.visit),
        add_employees: pruneEmpty(vm.add_employees),
        remove_employees: pruneEmpty(vm.remove_employees)
      };

      visitFactory.edit(payload, vm.visit_id)
        .then(success)
        .catch(fail);

      function success() {
        initialize();
      }
    }

    function remove(payload) {
      visitFactory.remove(payload, vm.visit_id)
        .then(success)
        .catch(fail);

      function success(res) {
        if (res.status === 204) {
          $location.path("/itineraries");
        } else {
          $location.path("/itinerary/" + vm.itinerary_id);
        }
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
      $log.log('Visit Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchesListController', controller);

  controller.$inject = [
    "$location",
    "branchFactory"
  ];

  function controller(
    $location,
    branchFactory
  ) {
    /* jshint validthis: true */
    var vm = this;

    vm.branches = getBranches();

    vm.view = view;
    //////////


    function getBranches() {
      branchFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branches = res;
      }
    }

    function view(data) {
      $location.path('/branch/' + data._id);
    }

    function fail(err) {
      alert('Branches List Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesListController', controller);

  controller.$inject = [
    "$location",
    "employeeFactory"
  ];

  function controller(
    $location,
    employeeFactory
  ) {
    /* jshint validthis: true */
    var vm = this;

    vm.employees = getEmployees();

    vm.view = view;
    //////////


    function getEmployees() {
      employeeFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employees = res;
      }
    }

    function view(data) {
      $location.path('/employee/' + data._id);
    }

    function fail(err) {
      alert('Employees List Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ItinerariesListController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "itineraryFactory"
  ];

  function controller(
    $log,
    $location,
    itineraryFactory
  ) {
    /* jshint validthis: true */
    var vm = this;

    vm.itineraries = getItineraries();

    vm.view = view;
    //////////


    function getItineraries() {
      itineraryFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.itineraries = res;
        for (var i = 0; i < vm.itineraries.length; i++) {
          vm.itineraries[i].start_date = moment(vm.itineraries[i].start_date).format("MMM Do, YYYY");
          vm.itineraries[i].end_date = moment(vm.itineraries[i].end_date).format("MMM Do, YYYY");
        }
      }
    }

    function view(id) {
      $location.path('/itinerary/' + id);
    }

    function fail(err) {
      $log.log('Itineraries List Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('VisitsListController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "visitFactory"
  ];

  function controller(
    $log,
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
        for (var i = 0; i < vm.visits.length; i++) {
          vm.visits[i].date = moment(vm.visits[i].date).format("MMM Do, YYYY");
        }
      }
    }

    function view(id) {
      $location.path('/visit/' + id);
    }

    function fail(err) {
      $log.log('Visits List Controller XHR Failed: ' + err.data);
    }
  }
})();