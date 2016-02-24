var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require("body-parser");

app.set('port', (process.env.PORT || 3333));

app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//DB & Model Handler
require('./server/config/mongoose.js');

//Route Handler
require('./server/config/routes.js')(app);

app.listen(app.get('port'), function() {
  console.log('listening on port ', app.get('port'));
});