import express from 'express';
import path from 'path';
const MongoClient = require('mongodb').MongoClient
import * as serverInfo from './controllers/server.controller';
import * as t from './controllers/tutorials.controller';
import * as boot from './controllers/bootstrap.controller';

const app = express();

app.set('views', path.join(__dirname, 'assets/views'));
app.set('view engine', 'ejs');

app.get('/healthcheck', serverInfo.healthcheck);
app.get('/server/version', serverInfo.version);
app.get('/server/hostname', serverInfo.hostname);

app.use("/static/elementos", express.static(__dirname + `../../elementos/`, { maxAge: '8h' }));

app.get('/services/caliber.bootstrap.js', boot.init)

let _data;
MongoClient.connect(process.env.DATABASEURI, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    _data = client.db('prod');

    app.route('/tutorial')
      .get( t.getTutorials(_data))
      .post( t.createTutorial(_data))
      .put( t.updateTutorial(_data))
      .delete( t.deleteTutorial(_data))

    app.get('/', serverInfo.splashPage(_data))
  })
  .catch(error => console.error(error))


export default app; 