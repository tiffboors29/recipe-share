import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';

import { getSecret } from './secrets';
import Recipe from './schema/recipe';

const Router = express.Router();

// store uploaded images locally
var fs = require('fs');
let upload = multer({ dest: 'public/images/uploads',
  rename: (fieldname, filename) => filename + '-' + Date.now()
});

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

// create new recipe
Router.post('/recipes', (req, res) => {
  const recipe = new Recipe();
  const errorMsg = getInvalidRecipeMsg(req.body);
  const { author, authorId, title, servings, prep, 
    time, ingredients, instructions } = req.body;

  if (errorMsg){
    return res.json({
      success: false,
      error: errorMsg
    });
  }

  recipe.author = author;
  recipe.authorId = authorId;
  recipe.title = title;
  recipe.servings = servings;
  recipe.prep = prep;
  recipe.time = time;
  recipe.ingredients = ingredients;
  recipe.instructions = instructions;
  recipe.save((err, recipe) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: recipe });
  });
});

// update recipe with uploaded image
Router.put('/recipes/:id', upload.single('file'), (req, res) => {
  Recipe.findById(req.params.id, (err, recipe) => {
    if (err) return res.json({ success: false, error: err });
    if (!recipe) return res.json({ success: false, error: 'Could not load recipe' });

    recipe.image = {
      data: fs.readFileSync(req.file.path),
      contentType: 'image/png'
    };
    recipe.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });
});


// helper method to validate recipe object
function getInvalidRecipeMsg (data){
  const { authorId, author, title, servings, prep, 
    time, ingredients, instructions } = data;
  let errors = [];
  if (!authorId || !author) errors.push('an author')
  if (!title) errors.push('a title')
  if (!servings) errors.push('servings')
  if (!prep) errors.push('prep time')
  if (!time) errors.push('full time')
  if (!ingredients) errors.push('ingredients')
  if (!instructions) errors.push('instructions')

  return errors.length ? `You must provide ${errors.join(", ")}.` : false;
}

export default Router;
