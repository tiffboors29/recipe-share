import React, { Component } from 'react';
import 'whatwg-fetch';

class Recipe extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.loadRecipeFromServer(this.props.match.params.id);
  }

  loadRecipeFromServer = (id) => {
    fetch(`/api/recipes/${id}`)
      .then(data => data.json())
      .then((res) => {
        if (!res.success) this.setState({ error: res.error });
        else this.setState({ data: res.data });
      });
  }

  render() {

    let recipe = this.state.data,
    base64Data;
    if (!recipe) return null;

    if (recipe.image && recipe.image.data){
      base64Data = new Buffer(recipe.image.data.data, 'binary').toString('base64');
    }

    return (
      <div className="main">
        <div className="recipe">
          <h2>{ recipe.title }</h2>

          {

            base64Data ? 
              <div className="recipe-image">
                <img src={ `data:image/png;base64,${base64Data}` } alt={ recipe.title }/>
              </div>
            : null
          }

          <div className="recipe-info">
            <label>Servings:</label><span>{ `${recipe.servings} minutes` }</span>
          </div>
          <div className="recipe-info">
            <label>Prep Time:</label><span>{ `${recipe.prep} minutes` }</span>
          </div>
          <div className="recipe-info">
            <label>Total Time:</label><span>{ `${recipe.time} minutes` }</span>
          </div>
          
          <div className="recipe-steps">
            <h5>Ingredients</h5>
            <ul className="ingredients">
              {
                (recipe.ingredients || []).map((ingredient, i) =>
                  <li key={ `ingredient-${i}` }>{ ingredient }</li>
                )
              }
            </ul>
            <h5>Directions</h5>
            <ol className="directions">
              {
                (recipe.instructions || []).map((instruction, i) =>
                  <li key={ `instruction-${i}` }>{ instruction }</li>
                )
              }
            </ol>
          </div>
        </div>
      </div>
    );
  }
};

export { Recipe };