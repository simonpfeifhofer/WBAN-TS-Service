var http = require('http');
var express    = require('express'); 
var bodyParser = require('body-parser');

var app = express(); 				// define our app using express
app.use(bodyParser());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

router
    .route('/sensordata')
    .post(
        function(req, res){
            var test = '123';
            req.json({'test': test});
        }
    );

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);