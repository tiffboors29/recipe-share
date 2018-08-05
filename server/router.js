import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { getSecret } from './secrets';

// mongoose.schema
const Schema = mongoose.Schema;
const RecipesSchema = new Schema({
  authorId: String,
  author: String,
  title: String,
  image: {
    data: Buffer,
    contentType: String
  },
  servings: Number,
  prep: Number,
  time: Number,
  ingredients: Array,
  instructions: Array
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', RecipesSchema);
const Router = express.Router();

// set the routes path & initialize the API
Router.get('/', (req, res) => {
  res.json({ message: 'Welcom to Recipe-Share!' });
});

// get all recipes
Router.get('/recipes', (req, res) => {
  Recipe.find((err, recipes) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: recipes });
  });
});

// get recipe by id
Router.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id, (err, recipe) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: recipe });
  });
});

export default Router;
