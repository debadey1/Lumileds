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