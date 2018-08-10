const express = require('express');
const multer = require('multer');

const Recipe = require('../schema/recipe');
const checkJwt = require('../authenticate').checkJwt;
const checkScopes = require('../authenticate').checkScopes;

const router = express.Router();

// store uploaded images locally
var fs = require('fs');
let upload = multer({ dest: 'public/images/uploads',
  rename: (fieldname, filename) => filename + '-' + Date.now()
});


// get all recipes
router.get('/recipes', (req, res) => {
  let authorId = req.query.authorId;
  if (authorId){
    Recipe.find({ 'authorId': authorId }, (err, recipe) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: recipe });
    });
  }
  else {
    Recipe.find((err, recipes) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: recipes });
    });
  }
});


// get recipe by id
router.get('/recipes/:id', (req, res) => {
  Recipe.findById(req.params.id, (err, recipe) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: recipe });
  });
});

// create new recipe
router.post('/recipes', checkJwt, checkScopes, (req, res) => {
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
router.put('/recipes/:id', checkJwt, checkScopes, upload.single('file'), (req, res) => {
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
  if (!time) errors.push('total time')
  if (!ingredients) errors.push('ingredients')
  if (!instructions) errors.push('instructions')

  return errors.length ? `You must provide ${errors.join(", ")}.` : false;
}

module.exports = router;
