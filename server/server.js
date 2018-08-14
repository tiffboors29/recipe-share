const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const checkJwt = require('./middleware/authenticate').checkJwt;
const checkScopes = require('./middleware/authenticate').checkScopes;
const routes = require('./routes');

const app = express();

dotenv.load();

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file';
}

app.use(cors());

// set port
const API_PORT = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// configure the db
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const staticFiles = express.static(path.join(__dirname, '../../client/build'))
app.use(staticFiles)

app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(err.status).json({ message: err.message });
});

// use router configs when calling /api
app.use('/api', routes);

// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

