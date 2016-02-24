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
      // templateUrl: 'dashboard/dashboard.html',
      // controller: 'DashboardController',
      // controllerAs: 'vm'
      .when('/',{
          templateUrl: 'lists/companies/companies.html',
          controller: 'CompaniesController',
          controllerAs: 'vm'
      })
      .when('/employees',{
          templateUrl: 'lists/employees/employees.html',
          controller: 'EmployeesController',
          controllerAs: 'vm'
      })
      .when('/customers',{
          templateUrl: 'lists/customers/customers.html',
          controller: 'CustomersController',
          controllerAs: 'vm'
      })
      .when('/trips',{
          templateUrl: 'lists/trips/trips.html',
          controller: 'TripsController',
          controllerAs: 'vm'
      })
      .when('/companies',{
          templateUrl: 'lists/companies/companies.html',
          controller: 'CompaniesController',
          controllerAs: 'vm'
      })
      .when('/branches',{
          templateUrl: 'lists/branches/branches.html',
          controller: 'BranchesController',
          controllerAs: 'vm'
      })
      .when('/employee/:id',{
          templateUrl: 'item/employee/employee.html',
          controller: 'EmployeeController',
          controllerAs: 'vm'
      })
      .when('/customer/:id',{
          templateUrl: 'item/customer/customer.html',
          controller: 'CustomerController',
          controllerAs: 'vm'
      })
      .when('/trip/:id',{
          templateUrl: 'item/trip/trip.html',
          controller: 'TripController',
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
      .otherwise({
        redirectTo: '/'
      });
  }
})();
(function () {
	'use strict';

	angular
		.module('app')
		.controller('DashboardController', controller);

	function controller() {
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
      add: add,
      remove: remove
    };

    return factory;
    //////////

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
      add: add,
      all: all,
      one: one,
      edit: edit,
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
    .factory('customerFactory', factory);

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
      return $http.get('/customers')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/customers/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.post('/customers/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/customers', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/customers/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Customer Factory XHR failed: ', error.data);
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
      remove: remove
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
      add: add,
      remove: remove
    };

    return factory;
    //////////

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
      add: add,
      remove: remove
    };

    return factory;
    //////////

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
    .factory('tripFactory', factory);

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
      return $http.get('/trips')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function one(id) {
      return $http.get('/trips/' + id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function edit(payload, id) {
      return $http.post('/trips/' + id, payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function add(payload) {
      return $http.post('/trips', payload)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function remove(data) {
      return $http.delete('/trips/' + data._id)
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }
    }

    function fail(error) {
      $log.log('Trip Factory XHR failed: ', error.data);
    }

  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('BranchController', controller);

  controller.$inject = [
    "$location",
    "$routeParams",
    "$anchorScroll",
    "branchFactory",
    "companyFactory",
    "airportFactory",
    "hotelFactory",
    "restaurantFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $location,
    $routeParams,
    $anchorScroll,
    branchFactory,
    companyFactory,
    airportFactory,
    hotelFactory,
    restaurantFactory,
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
    vm.remove = remove;
    vm.addAirport = addAirport;
    vm.addHotel = addHotel;
    vm.addRestaurant = addRestaurant;
    vm.removeAirport = removeAirport;
    vm.removeHotel = removeHotel;
    vm.removeRestaurant = removeRestaurant;
    vm.scrollTo = scrollTo;
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
      var payload = {
        branch: pruneEmpty(vm.new_branch),
        location_id: vm.branch.location._id,
        location: pruneEmpty(vm.branch_location)
      };

      branchFactory.edit(payload, vm.branch_id)
        .then(success)
        .catch(fail);

      function success() {
        getBranch();
        vm.new_branch = {};
        vm.branch_location = {};
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

    function addAirport() {
      var payload = {
        airport: pruneEmpty(vm.new_airport),
        location: pruneEmpty(vm.airport_location),
        branch_id: vm.branch_id
      };

      airportFactory.add(payload)
        .then(success)
        .catch(fail);

      function success() {
        getBranch();
        vm.new_airport = {};
        vm.airport_location = {};
      }
    }

    function addHotel() {
      var payload = {
        hotel: pruneEmpty(vm.new_hotel),
        location: pruneEmpty(vm.hotel_location),
        branch_id: vm.branch_id
      };

      hotelFactory.add(payload)
        .then(success)
        .catch(fail);

      function success() {
        getBranch();
        vm.new_hotel = {};
        vm.hotel_location = {};
      }
    }

    function addRestaurant() {
      var payload = {
        restaurant: pruneEmpty(vm.new_restaurant),
        location: pruneEmpty(vm.restaurant_location),
        branch_id: vm.branch_id
      };
      restaurantFactory.add(payload)
        .then(success)
        .catch(fail);

      function success() {
        getBranch();
        vm.new_restaurant = {};
        vm.restaurant_location = {};
      }
    }

    function removeAirport(data) {
      airportFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        getBranch();
      }
    }

    function removeHotel(data) {
      hotelFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        getBranch();
      }
    }

    function removeRestaurant(data) {
      restaurantFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        getBranch();
      }
    }

    function scrollTo(id) {
      var old = $location.hash();
      $location.hash(id);
      $anchorScroll();
      //reset to old to keep any additional routing logic from kicking in
      $location.hash(old);
    };

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
        company: pruneEmpty(vm.new_company)
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
    .controller('CustomerController', controller);

  controller.$inject = [
    "$location",
    "$routeParams",
    "customerFactory",
    "companyFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $location,
    $routeParams,
    customerFactory,
    companyFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.customer_id = $routeParams.id;
    vm.customer = getCustomer();
    vm.companies = getCompanies();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getCustomer() {
      customerFactory.one(vm.customer_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.customer = res;
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
      var payload = {
        customer: pruneEmpty(vm.new_customer)
      };
      customerFactory.edit(payload, vm.customer_id)
        .then(success)
        .catch(fail);

      function success(res) {
        getCustomer();
        vm.new_customer = {};
      }
    }

    function remove(data) {
      customerFactory.remove(data)
        .then(success)
        .catch(fail);

      function success(res) {
        $location.path("/customers");
      }
    }

    function fail(err) {
      alert('Customer Controller XHR Failed: ' + err.data);
    }
  }
})();
(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeeController', controller);

  controller.$inject = [
    "$location",
    "$routeParams",
    "employeeFactory",
    "pruneFactory",
    "regionFactory"
  ];

  function controller(
    $location,
    $routeParams,
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
      employeeFactory.one(vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employee = res;
      }
    }

    function edit() {
      var payload = {
        employee: pruneEmpty(vm.new_employee),
        location_id: vm.employee.location._id,
        location: pruneEmpty(vm.new_location)
      };
      employeeFactory.edit(payload, vm.employee_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employee = res[0];
        vm.employee.location = res[1];
        vm.new_employee = {};
        vm.new_location = {};
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
    .controller('TripController', controller);

  controller.$inject = [
    "$log",
    "$location",
    "$routeParams",
    "tripFactory",
    "companyFactory",
    "employeeFactory",
    "regionFactory",
    "pruneFactory"
  ];

  function controller(
    $log,
    $location,
    $routeParams,
    tripFactory,
    companyFactory,
    employeeFactory,
    regionFactory,
    pruneFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    var pruneEmpty = pruneFactory.pruneEmpty;
    vm.regions = regionFactory.regions;

    vm.trip_id = $routeParams.id;
    vm.trip = getTrip();
    vm.companies = getCompanies();
    vm.employees = getEmployees();

    vm.edit = edit;
    vm.remove = remove;
    //////////

    function getTrip() {
      tripFactory.one(vm.trip_id)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.trip = res;
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

    function getEmployees() {
      employeeFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employees = res;
        for (var i = 0; i < vm.trip.employees.length; i++) {
          for (var j = 0; j < vm.employees.length; j++) {
            if (vm.employees[j]._id === vm.trip.employees[i]._id) {
              vm.employees.splice(j, 1);
            }
          }
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
        trip: pruneEmpty(vm.new_trip),
        add_employees: pruneEmpty(vm.add_employees),
        remove_employees: pruneEmpty(vm.remove_employees)
      };

      tripFactory.edit(payload, vm.trip_id)
        .then(success)
        .catch(fail);

      function success() {
        getTrip();
        getEmployees();
        vm.new_trip = {};
      }
    }

    function remove(data) {
      tripFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        $location.path("/trips");
      }
    }

    function fail(err) {
      alert('Trip Controller XHR Failed: ' + err.data);
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
    vm.remove = remove;
    vm.view = view;
    //////////


    function getBranches() {
      branchFactory.all(vm.branch_id)
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

    function add() {
      var payload = {
        branch: pruneEmpty(vm.new_branch),
        branch_location: pruneEmpty(vm.branch_location)
      };

      branchFactory.add(payload)
        .then(success)
        .catch(fail);

      function success(res) {
        getBranches();
        vm.new_branch = {};
        vm.branch_location = {};
      }
    }
    
    function remove(data) {
      branchFactory.remove(data)
        .then(success)
        .catch(fail);

      function success(res) {
        vm.branches.splice(vm.branches.indexOf(data), 1);
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
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res;
      }
    }

    function add() {
      var payload = {
        company: vm.new_company
      };

      companyFactory.add(payload)
        .then(success)
        .catch(fail);

      function success() {
        getCompanies();
        vm.new_company = {};
      }
    }
    
    function remove(data) {
      companyFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        vm.companies.splice(vm.companies.indexOf(data), 1);
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
(function () {
  'use strict';

  angular
    .module('app')
    .controller('EmployeesController', controller);

  controller.$inject = [
    "$location",
    "employeeFactory",
    "regionFactory"
  ];

  function controller(
    $location,
    employeeFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.employees = getEmployees();

    vm.add = add;
    vm.remove = remove;
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

    function add() {
      var payload = {
        employee: vm.new_employee,
        location: vm.new_location
      };
      employeeFactory.add(payload)
        .then(success)
        .catch(fail);

      function success() {
        getEmployees();
        vm.new_employee = {};
        vm.new_location = {};
      }
    }
    
    function remove(data) {
      employeeFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        vm.employees.splice(vm.employees.indexOf(data), 1);
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
    .controller('TripsController', controller);

  controller.$inject = [
    "$location",
    "tripFactory",
    "companyFactory",
    "employeeFactory",
    "regionFactory"
  ];

  function controller(
    $location,
    tripFactory,
    companyFactory,
    employeeFactory,
    regionFactory
  ) {
    /* jshint validthis: true */
    var vm = this;
    vm.regions = regionFactory.regions;

    vm.companies = getCompanies();
    vm.employees = getEmployees();
    vm.trips = getTrips();

    vm.add = add;
    vm.remove = remove;
    vm.view = view;
    //////////

    function getCompanies() {
      companyFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.companies = res;
      }
    }

    function getEmployees() {
      employeeFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.employees = res;
      }
    }

    function getTrips() {
      tripFactory.all()
        .then(success)
        .catch(fail);

      function success(res) {
        vm.trips = res;
      }
    }

    function add() {
      tripFactory.add(vm.new_trip)
        .then(success)
        .catch(fail);

      function success() {
        getTrips();
        vm.new_trip = {};
        getEmployees();
      }
    }
    
    function remove(data) {
      tripFactory.remove(data)
        .then(success)
        .catch(fail);

      function success() {
        vm.trips.splice(vm.trips.indexOf(data), 1);
      }
    }

    function view(data) {
      $location.path('/trip/' + data._id);
    }

    function fail(err) {
      alert('Trips Controller XHR Failed: ' + err.data);
    }
  }
})();