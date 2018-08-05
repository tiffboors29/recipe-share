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

    let recipe = this.state.data;
    if (!recipe) return null;

    // TO-DO: display image

    return (
      <div className="main-content">
        <div className="recipe">
          <h2>{ recipe.title }</h2>

          <div className="recipe-image">
            <img src={ recipe.image } />
          </div>

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