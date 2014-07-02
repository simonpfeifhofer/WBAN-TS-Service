var http = require('http');
var express    = require('express'); 
var bodyParser = require('body-parser');
var mongo = require('mongodb');


var app = express(); 				// define our app using express
app.use(bodyParser());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

router.get('/', function(req, res) {
	res.json({ message: 'WBAN-TS Sensor-Data API!' });	
});

WriteError = function(res, message){
    res.json(
        {
            'success' : false, 
            'error' : message
        }
    );
}

WriteSuccess = function(res, id){
    res.json(
        {
            'success' : true, 
            'entryId' : id
        }
    );
}

WriteSuccessResultSet = function(res, results){
    res.json(
        {
            'success' : true, 
            'results' : results
        }
    );
}

router
    .route('/sensordata')
    .post(
        function(req, res){
           
            // Connect to the db
            mongo.MongoClient.connect(
                "mongodb://wbants-mongodb.cloudapp.net:27017/sensorData", 
                function(err, db) {
                    if(err) { 
                        WriteError(res, err);
                        return;
                    }
                    var collection = db.collection('sensorEntry');
                    var document = req.body;
                    collection.insert(
                        document, 
                        {w: 1}, 
                        function(err, records){
                            if(err) { 
                                WriteError(res, err);
                                return;
                            }
                            WriteSuccess(res, records[0]._id);
                        }
                    );

                }
            );
        }
    );

router
    .route('/sensordata/:type?')
    .get(
        function(req, res){

            mongo.MongoClient.connect(
                "mongodb://wbants-mongodb.cloudapp.net:27017/sensorData", 
                function(err, db) {
                    if(err) { 
                        WriteError(res, err);
                        return;
                    }
                    var collection = db.collection('sensorEntry');
                    var query = {};
                    if(req.params.type != undefined){
                        query = {profile: req.params.type};
                    }
                    collection.find(
                        query
                    ).toArray(
                        function(err, records){
                            if(err) { 
                                WriteError(res, err);
                                return;
                            }
                            WriteSuccessResultSet(res, records);
                        }
                    );

                }
            );

        }
     );

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('WBAN-TS Sensor-Data API started on port ' + port);