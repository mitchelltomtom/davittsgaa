var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

var fixtures = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/mayo_fixtures.json'), 'utf8'));

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/fixtures/:club_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        var club_fixtures = fixtures[req.params.club_id];
        res.json(club_fixtures);
    });

router.route('/fixtures/:club_id/home_fixtures')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        var club_fixtures = fixtures[req.params.club_id];
        if(club_fixtures){
          res.json(club_fixtures['home_fixtures']);
        }else{
          res.json({});
        }

    });

router.route('/fixtures/:club_id/away_fixtures')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        var club_fixtures = fixtures[req.params.club_id];
        if(club_fixtures){
          res.json(club_fixtures['away_fixtures']);
        }else{
          res.json({});
        }
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(3000);
console.log('Listening on port 3000');
