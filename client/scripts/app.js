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