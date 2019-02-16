const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db             = require('./app/config/db');
const server         = require('./app/config/server');

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  var db = client.db('notes');

  // Route Files
  require('./app/routes/note_routes')(app, db);
  require('./app/routes/users_routes')(app, db);
  app.listen(server.port, () => {
    console.log('We are live on ' + server.port);
  });               
})