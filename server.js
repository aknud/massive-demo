var express = require('express');
var bodyParser = require('body-parser');
var massive = require('massive');

var app = express();
app.use(bodyParser.json());

massive({
  host: 'ec2-54-204-23-228.compute-1.amazonaws.com',
  port: 5432,
  database: 'dd0pvkhcngjf8t',
  user: 'oyokkimgavbwpn',
  password: '5a723764d541368795d6378452c7423d2095ef92de257d6a98032bdfccb6929d',
  ssl: true
}).then((db) => app.set('db', db)) //attach db connection to express app.


var port = 3000;

const getConn = (req) => req.app.get('db');

const severityIndex = {
  'low': function (db) {
    return db.getMildInjuries;
  },
  'high': function (db) {
    return db.getSevereInjuries;
  },
  'all': function (db) {
    return db.getAllInjuries;
  }
}

app.get('/injuries', (req, res) => {
  severityIndex[req.query.severity || 'all'](getConn(req))()
    .then(injuries => res.send(injuries))
})

app.get('/incidents', (req, res) => {
  var tth = req.query.tth;
  req.app.get('db').getAllIncidents([tth]).then(incidents => {
    res.send(incidents);
  });
});

app.post('/incidents', function (req, res) {
  console.log('POST sighting');
});

app.listen(port, function () {
  console.log("Started server on port", port);
});
