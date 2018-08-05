import mongoose from 'mongoose';

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

export default mongoose.model('Recipe', RecipesSchema);