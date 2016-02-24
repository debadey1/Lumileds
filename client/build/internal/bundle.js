angular.module('miniStore', ['ngRoute', 'isteven-multi-select'])

.config(["$routeProvider", function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/dashboard.html',
        controller: 'DashboardController'
    })
    .when('/employees',{
        templateUrl: 'partials/employees.html',
        controller: 'EmployeeController'
    })
    .when('/customers',{
        templateUrl: 'partials/customers.html',
        controller: 'CustomerController'
    })
    .when('/trips',{
        templateUrl: 'partials/trips.html',
        controller: 'TripController'
    })
    .when('/companies',{
        templateUrl: 'partials/companies.html',
        controller: 'CompanyController'
    })
    .when('/branches',{
        templateUrl: 'partials/branches.html',
        controller: 'BranchController'
    })
    .when('/employee/:id',{
        templateUrl: 'partials/employee.html',
        controller: 'EmployeeViewController'
    })
    .when('/customer/:id',{
        templateUrl: 'partials/customer.html',
        controller: 'CustomerViewController'
    })
    .when('/trip/:id',{
        templateUrl: 'partials/trip.html',
        controller: 'TripViewController'
    })
    .when('/company/:id',{
        templateUrl: 'partials/company.html',
        controller: 'CompanyViewController'
    })
    .when('/branch/:id',{
        templateUrl: 'partials/branch.html',
        controller: 'BranchViewController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
angular.module('miniStore')
.controller('BranchViewController', ["$scope", "BranchFactory", "$location", "$routeParams", "$anchorScroll", "CompanyFactory", "AirportFactory", "HotelFactory", "RestaurantFactory", function($scope, BranchFactory, $location, $routeParams, $anchorScroll, CompanyFactory, AirportFactory, HotelFactory, RestaurantFactory) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  BranchFactory.one($routeParams.id, function(data) {
    $scope.branch = data;
  });
  CompanyFactory.all(function (data) {
    $scope.companies = data;
  });

  $scope.edit = function() {
    var payload = {
      branch: pruneEmpty($scope.new_branch),
      location_id: $scope.branch.location._id,
      location: pruneEmpty($scope.branch_location)
    };
    BranchFactory.edit(payload, $routeParams.id, function() {
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
      $scope.new_branch = {};
      $scope.branch_location = {};
    });
  }

  $scope.addAirport = function() {
    var payload = {
      airport: pruneEmpty($scope.new_airport),
      location: pruneEmpty($scope.airport_location),
      branch_id: $routeParams.id
    };
    AirportFactory.add(payload, function() {
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
      $scope.new_airport = {};
      $scope.airport_location = {};
    });
  }

  $scope.addHotel = function() {
    var payload = {
      hotel: pruneEmpty($scope.new_hotel),
      location: pruneEmpty($scope.hotel_location),
      branch_id: $routeParams.id
    };
    HotelFactory.add(payload, function() {
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
      $scope.new_hotel = {};
      $scope.hotel_location = {};
    });
  }

  $scope.addRestaurant = function() {
    var payload = {
      restaurant: pruneEmpty($scope.new_restaurant),
      location: pruneEmpty($scope.restaurant_location),
      branch_id: $routeParams.id
    };
    RestaurantFactory.add(payload, function() {
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
      $scope.new_restaurant = {};
      $scope.restaurant_location = {};
    });
  }

  $scope.remove = function(data) {
    BranchFactory.remove(data, function(){
      $location.path("/branches");
    });
  }

  $scope.removeAirport = function(data) {
    AirportFactory.remove(data, function(){
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
    });
  }

  $scope.removeHotel = function(data) {
    HotelFactory.remove(data, function(){
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
    });
  }

  $scope.removeRestaurant = function(data) {
    RestaurantFactory.remove(data, function(){
      BranchFactory.one($routeParams.id, function(data) {
        $scope.branch = data;
      });
    });
  }

  $scope.scrollTo = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    //reset to old to keep any additional routing logic from kicking in
    $location.hash(old);
  };

  function pruneEmpty(obj) {
    return function prune(current) {
      _.forOwn(current, function (value, key) {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(prune(value)))) {

          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete 
      // operation on an array
      if (_.isArray(current)) _.pull(current, undefined);

      return current;

    }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
  }
}]);
angular.module('miniStore')
.controller('BranchController', ["$scope", "CompanyFactory", "BranchFactory", "$location", function($scope, CompanyFactory, BranchFactory, $location) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  BranchFactory.all(function(data) {
    $scope.branches = data;
  });
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  $scope.add = function() {
    var payload = {
      branch: pruneEmpty($scope.new_branch),
      branch_location: pruneEmpty($scope.branch_location)
    };

    BranchFactory.add(payload, function() {
      BranchFactory.all(function(data) {
        $scope.branches = data;
      });
      $scope.new_branch = {};
      $scope.new_airport = {};
      $scope.new_hotel = {};
      $scope.branch_location = {};
      $scope.airport_location = {};
      $scope.hotel_location = {};
    });
  }
  $scope.remove = function(data) {
    BranchFactory.remove(data, function(){
      $scope.branches.splice($scope.branches.indexOf(data), 1);
    });
  }

  $scope.view = function(data) {
    $location.path('/branch/' + data._id);
  }

  function pruneEmpty(obj) {
    return function prune(current) {
      _.forOwn(current, function (value, key) {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(prune(value)))) {

          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete 
      // operation on an array
      if (_.isArray(current)) _.pull(current, undefined);

      return current;

    }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
  }
}]);
angular.module('miniStore')
.controller('CompanyController', ["$scope", "CompanyFactory", "$location", function($scope, CompanyFactory, $location) {
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  $scope.add = function() {
    var payload = {
      company: $scope.new_company
    }
    CompanyFactory.add(payload, function() {
      CompanyFactory.all(function(data) {
        $scope.companies = data;
      });
      $scope.new_company = {};
    });
  }
  $scope.remove = function(data) {
    CompanyFactory.remove(data, function(){
      $scope.companies.splice($scope.companies.indexOf(data), 1);
    });
  }
  $scope.view = function(data) {
    $location.path('/company/' + data._id);
  }
}]);
angular.module('miniStore')
.controller('CompanyViewController', ["$scope", "CompanyFactory", "$location", "$routeParams", function($scope, CompanyFactory, $location, $routeParams) {
  
  CompanyFactory.one($routeParams.id, function(data) {
    $scope.company = data;
  });
  $scope.edit = function() {
    var payload = {
      company: pruneEmpty($scope.new_company)
    };
    CompanyFactory.edit(payload, $routeParams.id, function() {
      CompanyFactory.one($routeParams.id, function(data) {
        $scope.company = data;
      });
      $scope.new_company = {};
    });
  }
  $scope.remove = function(data) {
    CompanyFactory.remove(data, function(){
      $location.path("/companies");
    });
  }

  function pruneEmpty(obj) {
    return function prune(current) {
      _.forOwn(current, function (value, key) {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(prune(value)))) {

          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete 
      // operation on an array
      if (_.isArray(current)) _.pull(current, undefined);

      return current;

    }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
  }
}]);
angular.module('miniStore')
.controller('CustomerViewController', ["$scope", "CustomerFactory", "$location", "$routeParams", "CompanyFactory", function($scope, CustomerFactory, $location, $routeParams, CompanyFactory) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  CustomerFactory.one($routeParams.id, function(data) {
    $scope.customer = data;
  });
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  $scope.edit = function() {
    var payload = {
      customer: pruneEmpty($scope.new_customer)
    };
    CustomerFactory.edit(payload, $routeParams.id, function() {
      CustomerFactory.one($routeParams.id, function(data) {
        $scope.customer = data;
      });
      $scope.new_customer = {};
      $scope.new_location = {};
    });
  }
  $scope.remove = function(data) {
    CustomerFactory.remove(data, function(){
      $location.path("/customers");
    });
  }

  function pruneEmpty(obj) {
    return function prune(current) {
      _.forOwn(current, function (value, key) {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(prune(value)))) {

          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete 
      // operation on an array
      if (_.isArray(current)) _.pull(current, undefined);

      return current;

    }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
  }
}]);
angular.module('miniStore')
.controller('CustomerController', ["$scope", "CompanyFactory", "CustomerFactory", "$location",function($scope, CompanyFactory, CustomerFactory, $location) {
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  CustomerFactory.all(function(data) {
    $scope.customers = data;
  });
  
  $scope.add = function() {
    CustomerFactory.add($scope.new_customer, function() {
      CustomerFactory.all(function(data) {
        $scope.customers = data;
      });
      $scope.new_customer = {};
    });
  }
  $scope.remove = function(data) {
    CustomerFactory.remove(data, function(){
      $scope.customers.splice($scope.customers.indexOf(data), 1);
    });
  }
  $scope.view = function(data) {
    $location.path('/customer/' + data._id);
  }
}]);
angular.module('miniStore')
.controller('DashboardController', ["$scope", function($scope) {
}]);
angular.module('miniStore')
.controller('EmployeeViewController', ["$scope", "EmployeeFactory", "$location", "$routeParams", function($scope, EmployeeFactory, $location, $routeParams) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  EmployeeFactory.one($routeParams.id, function(data) {
    $scope.employee = data;
  });
  $scope.edit = function() {
    var payload = {
      employee: pruneEmpty($scope.new_employee),
      location_id: $scope.employee.location._id,
      location: pruneEmpty($scope.new_location)
    };
    EmployeeFactory.edit(payload, $routeParams.id, function(data) {
      $scope.employee = data[0];
      $scope.employee.location = data[1];
      $scope.new_employee = {};
      $scope.new_location = {};
    });
  }
  $scope.remove = function(data) {
    EmployeeFactory.remove(data, function(){
      $location.path("/employees");
    });
  }

  function pruneEmpty(obj) {
    return function prune(current) {
      _.forOwn(current, function (value, key) {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(prune(value)))) {

          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete 
      // operation on an array
      if (_.isArray(current)) _.pull(current, undefined);

      return current;

    }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
  }
}]);
angular.module('miniStore')
.controller('EmployeeController', ["$scope", "EmployeeFactory", "$location", function($scope, EmployeeFactory, $location) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  EmployeeFactory.all(function(data) {
    $scope.employees = data;
  });
  
  $scope.add = function() {
    var payload = {
      employee: $scope.new_employee,
      location: $scope.new_location
    };
    EmployeeFactory.add(payload, function() {
      EmployeeFactory.all(function(data) {
        $scope.employees = data;
      });
      $scope.new_employee = {};
      $scope.new_location = {};
    });
  }
  $scope.remove = function(data) {
    EmployeeFactory.remove(data, function(){
      $scope.employees.splice($scope.employees.indexOf(data), 1);
    });
  }

  $scope.view = function(data) {
    $location.path('/employee/' + data._id);
  }
}]);
angular.module('miniStore')
.controller('TripViewController', ["$scope", "TripFactory", "$location", "$routeParams", "CompanyFactory", "EmployeeFactory", function($scope, TripFactory, $location, $routeParams, CompanyFactory, EmployeeFactory) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  TripFactory.one($routeParams.id, function(data) {
    $scope.trip = data;
  });
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  EmployeeFactory.all(function(data) {
    $scope.employees = data;
    for (var i = 0; i < $scope.trip.employees.length; i++) {
      for (var j = 0; j < $scope.employees.length; j++) {
        if ($scope.employees[j]._id === $scope.trip.employees[i]._id) {
          $scope.employees.splice(j, 1);
        }
      }
    }
  });
  $scope.edit = function() {
    for (var i = 0; i < $scope.add_employees.length; i++) {
      $scope.add_employees[i] = $scope.add_employees[i]._id;
    }
    for (var i = 0; i < $scope.remove_employees.length; i++) {
      $scope.remove_employees[i] = $scope.remove_employees[i]._id;
    }

    var payload = {
      trip: pruneEmpty($scope.new_trip),
      add_employees: pruneEmpty($scope.add_employees),
      remove_employees: pruneEmpty($scope.remove_employees)
    };
    TripFactory.edit(payload, $routeParams.id, function() {
      TripFactory.one($routeParams.id, function(data) {
        $scope.trip = data;
      });
      $scope.new_trip = {};
      EmployeeFactory.all(function(data) {
        $scope.employees = data;
        for (var i = 0; i < $scope.trip.employees.length; i++) {
          for (var j = 0; j < $scope.employees.length; j++) {
            if ($scope.employees[j]._id === $scope.trip.employees[i]._id) {
              $scope.employees.splice(j, 1);
            }
          }
        }
      });
    });
  }
  $scope.remove = function(data) {
    TripFactory.remove(data, function(){
      $location.path("/trips");
    });
  }

  function pruneEmpty(obj) {
    return function prune(current) {
      _.forOwn(current, function (value, key) {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(prune(value)))) {

          delete current[key];
        }
      });
      // remove any leftover undefined values from the delete 
      // operation on an array
      if (_.isArray(current)) _.pull(current, undefined);

      return current;

    }(_.cloneDeep(obj));  // Do not modify the original object, create a clone instead
  }
}]);
angular.module('miniStore')
.controller('TripController', ["$scope", "TripFactory", "CompanyFactory", "EmployeeFactory", "$location", function($scope, TripFactory, CompanyFactory, EmployeeFactory, $location) {
  $scope.regions = [
    "Americas",
    "APAC",
    "EMEA",
    "Japan"
  ];
  CompanyFactory.all(function(data) {
    $scope.companies = data;
  });
  EmployeeFactory.all(function(data) {
    $scope.employees = data;
  });
  TripFactory.all(function(data) {
    $scope.trips = data;
  });

  $scope.add = function() {
    TripFactory.add($scope.new_trip, function() {
      TripFactory.all(function(data) {
        $scope.trips = data;
      });
      $scope.new_trip = {};
      EmployeeFactory.all(function(data) {
        $scope.employees = data;
      });
    });
  }
  $scope.remove = function(data) {
    TripFactory.remove(data, function(){
      $scope.trips.splice($scope.trips.indexOf(data), 1);
    });
  }
  $scope.view = function(data) {
    $location.path('/trip/' + data._id);
  }
}]);
angular.module('miniStore')
.factory('AirportFactory', ["$http", function($http) {
  var factory = {};
  factory.add = function(payload, callback) {
    $http.post('/airports', payload)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(data, callback) {
    $http.delete('/airports/'+ data._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }

  return factory;
  // factory.all = function(callback) {
  //   $http.get('/airports')
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
  // factory.one = function(id, callback) {
  //   $http.get('/airports/' + id)
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
  // factory.edit = function(payload, id, callback) {
  //   $http.post('/airports/' + id, payload)
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
}]);
angular.module('miniStore')
.factory('BranchFactory', ["$http", function($http) {
  var factory = {};
  factory.all = function(callback) {
    $http.get('/branches')
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.one = function(id, callback) {
    $http.get('/branches/' + id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.edit = function(payload, id, callback) {
    $http.post('/branches/' + id, payload)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.add = function(payload, callback) {
    $http.post('/branches', payload)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(branch, callback) {
    $http.delete('/branches/'+ branch._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
}]);
angular.module('miniStore')
.factory('CompanyFactory', ["$http", function($http) {
  var factory = {};
  factory.all = function(callback) {
    $http.get('/companies')
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.one = function(id, callback) {
    $http.get('/companies/' + id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.edit = function(payload, id, callback) {
    $http.post('/companies/' + id, payload)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.add = function(new_company, callback) {
    $http.post('/companies', new_company)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(company, callback) {
    $http.delete('/companies/'+ company._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
}]);
angular.module('miniStore')
.factory('CustomerFactory', ["$http", function($http) {
  var factory = {};
  factory.all = function(callback) {
    $http.get('/customers')
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.one = function(id, callback) {
    $http.get('/customers/' + id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.add = function(new_customer, callback) {
    $http.post('/customers', new_customer)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.edit = function(payload, id, callback) {
    $http.post('/customers/' + id, payload)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.remove = function(customer, callback) {
    $http.delete('/customers/'+ customer._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
}]);
angular.module('miniStore')
.factory('EmployeeFactory', ["$http", function($http) {
  var factory = {};
  factory.all = function(callback) {
    $http.get('/employees')
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.one = function(id, callback) {
    $http.get('/employees/' + id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.edit = function(payload, id, callback) {
    $http.post('/employees/' + id, payload)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.add = function(payload, callback) {
    $http.post('/employees', payload)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(employee, callback) {
    $http.delete('/employees/'+ employee._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
}]);
angular.module('miniStore')
.factory('HotelFactory', ["$http", function($http) {
  var factory = {};
  factory.add = function(payload, callback) {
    $http.post('/hotels', payload)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(data, callback) {
    $http.delete('/hotels/'+ data._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
  // factory.all = function(callback) {
  //   $http.get('/airports')
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
  // factory.one = function(id, callback) {
  //   $http.get('/airports/' + id)
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
  // factory.edit = function(payload, id, callback) {
  //   $http.post('/airports/' + id, payload)
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
}]);
angular.module('miniStore')
.factory('RestaurantFactory', ["$http", function($http) {
  var factory = {};
  factory.add = function(payload, callback) {
    $http.post('/restaurants', payload)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(data, callback) {
    $http.delete('/restaurants/'+ data._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
  // factory.all = function(callback) {
  //   $http.get('/airports')
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
  // factory.one = function(id, callback) {
  //   $http.get('/airports/' + id)
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
  // factory.edit = function(payload, id, callback) {
  //   $http.post('/airports/' + id, payload)
  //     .then(function (response) {
  //       callback(response.data);
  //     }, function (error) {
  //       throw error;
  //     });
  // }
}]);
angular.module('miniStore')
.factory('TripFactory', ["$http", function($http) {
  var factory = {};
  factory.all = function(callback) {
    $http.get('/trips')
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.one = function(id, callback) {
    $http.get('/trips/' + id)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.edit = function(payload, id, callback) {
    $http.post('/trips/' + id, payload)
      .then(function (response) {
        callback(response.data);
      }, function (error) {
        throw error;
      });
  }
  factory.add = function(new_trip, callback) {
    $http.post('/trips', new_trip)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  factory.remove = function(trip, callback) {
    $http.delete('/trips/'+ trip._id)
      .then(function (response) {
        callback();
      }, function (error){
        throw error;
      });
  }
  return factory;
}]);