var companies = require('../controllers/companies.js');
var employees = require('../controllers/employees.js');
var trips = require('../controllers/trips.js');
var customers = require('../controllers/customers.js');
var branches = require('../controllers/branches.js');
var airports = require('../controllers/airports.js');
var hotels = require('../controllers/hotels.js');
var restaurants = require('../controllers/restaurants.js');

module.exports = function (app) {
  app.get('/companies',
    function (req, res){
      companies.all(req, res);
    });
  app.get('/companies/:id',
    function (req, res){
      companies.one(req, res);
    });
  app.post('/companies/:id',
    function (req, res){
      companies.edit(req, res);
    });
  app.post('/companies',
    function (req, res){
      companies.create(req, res);
    });
  app.delete('/companies/:id',
    function (req, res){
      companies.destroy(req, res);
    });

  app.get('/employees',
    function (req, res){
      employees.all(req, res);
    });
  app.get('/employees/:id',
    function (req, res){
      employees.one(req, res);
    });
  app.post('/employees/:id',
    function (req, res){
      employees.edit(req, res);
    });
  app.post('/employees',
    function (req, res){
      employees.create(req, res);
    });
  app.delete('/employees/:id',
    function (req, res){
      employees.destroy(req, res);
    });

  app.get('/trips',
    function (req, res){
      trips.all(req, res);
    });
  app.get('/trips/:id',
    function (req, res){
      trips.one(req, res);
    });
  app.post('/trips/:id',
    function (req, res){
      trips.edit(req, res);
    });
  app.post('/trips',
    function (req, res){
      trips.create(req, res);
    });
  app.delete('/trips/:id',
    function (req, res){
      trips.destroy(req, res);
    });

  app.get('/customers',
    function (req, res){
      customers.all(req, res);
    });
  app.get('/customers/:id',
    function (req, res){
      customers.one(req, res);
    });
  app.post('/customers/:id',
    function (req, res){
      customers.edit(req, res);
    });
  app.post('/customers',
    function (req, res){
      customers.create(req, res);
    });
  app.delete('/customers/:id',
    function (req, res){
      customers.destroy(req, res);
    });

  app.get('/branches',
    function (req, res){
      branches.all(req, res);
    });
  app.get('/branches/:id',
    function (req, res){
      branches.one(req, res);
    });
  app.post('/branches/:id',
    function (req, res){
      branches.edit(req, res);
    });
  app.post('/branches',
    function (req, res){
      branches.create(req, res);
    });
  app.delete('/branches/:id',
    function (req, res){
      branches.destroy(req, res);
    });

  app.post('/airports',
    function (req, res){
      airports.create(req, res);
    });
  app.delete('/airports/:id',
    function (req, res){
      airports.destroy(req, res);
    });
  app.post('/hotels',
    function (req, res){
      hotels.create(req, res);
    });
  app.delete('/hotels/:id',
    function (req, res){
      hotels.destroy(req, res);
    });
  app.post('/restaurants',
    function (req, res){
      restaurants.create(req, res);
    });
  app.delete('/restaurants/:id',
    function (req, res){
      restaurants.destroy(req, res);
    });
};