import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { getSecret } from './secrets';
import Router from './router';

// create our instances
const app = express();
// const router = express.Router();

// set port
const API_PORT = process.env.API_PORT || 3001;

// configure db -set URI from mLab (secrets.js)
mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// configure API -use bodyParser to look for JSON data in request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// use router config when calling /api
app.use('/api', Router);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

