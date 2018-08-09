const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// mongoose.schema
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

module.exports = mongoose.model('Recipe', RecipesSchema);