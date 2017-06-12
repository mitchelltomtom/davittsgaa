var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

var fixtures = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/mayo_fixtures.json'), 'utf8'));
var comp_ref = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/data/comp_ref.json'), 'utf8'));

app.use(express.static(path.join(__dirname, 'public')));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});


function timeSorter(a,b){
  var aSplitDate = a.date.split("/"),
      bSplitDate = b.date.split("/"),
      aSplitTime = a.time.split(":"),
      bSplitTime = b.time.split(":");

  var aDateOrderer = isNaN(aSplitDate[0]) && aSplitDate.length !==3 ? 0 : (aSplitDate[2] * 10000) + (aSplitDate[1] * 100) + aSplitDate[0];
  var bDateOrderer = isNaN(bSplitDate[0]) && bSplitDate.length !==3 ? 0 : (bSplitDate[2] * 10000) + (bSplitDate[1] * 100) + bSplitDate[0];
  var aTimeOrderer = isNaN(aSplitTime[0]) && aSplitTime.length !==3 ? 0 : (aSplitTime[2] * 3600) + (aSplitTime[1] * 60) + aSplitTime[0];
  var bTimeOrderer = isNaN(bSplitTime[0]) && bSplitTime.length !==3 ? 0 : (bSplitTime[2] * 3600) + (bSplitTime[1] * 60) + bSplitTime[0];

  var aOrderer = aDateOrderer + aTimeOrderer;
  var bOrderer = bDateOrderer + bTimeOrderer;
  if (aOrderer < bOrderer)
    return -1;
  if (aOrderer > bOrderer)
    return 1;
  return 0;
}

router.route('/fixtures/:club_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        var club_fixtures = fixtures[req.params.club_id];
        var home_fixtures = club_fixtures.home_fixtures;
        var away_fixtures = club_fixtures.away_fixtures;
        var all_fixtures = home_fixtures.concat(away_fixtures);
        all_fixtures = all_fixtures.sort(timeSorter);
        all_fixtures = all_fixtures.map(x => {x.comp_details = comp_ref[x.comp];return x})
        res.json(all_fixtures);
    });

router.route('/fixtures/:club_id/home_fixtures')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        var club_fixtures = fixtures[req.params.club_id]['home_fixtures'];
        if(club_fixtures){
          all_fixtures = club_fixtures.map(x => {x.comp_details = comp_ref[x.comp];return x})
          res.json(all_fixtures);
        }else{
          res.json({});
        }

    });

router.route('/fixtures/:club_id/away_fixtures')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        var club_fixtures = fixtures[req.params.club_id]['away_fixtures'];
        if(club_fixtures){
          all_fixtures = club_fixtures.map(x => {x.comp_details = comp_ref[x.comp];return x})
          res.json(all_fixtures);
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
