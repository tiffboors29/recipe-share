// helper method to validate recipe object
const getInvalidRecipeMsg = (data) => {
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

module.exports = { getInvalidRecipeMsg };