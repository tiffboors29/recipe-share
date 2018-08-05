import React, { Component } from 'react';
import 'whatwg-fetch';

import { RecipeForm } from './RecipeForm';

const defaultState = {
  "author": "Tiff", // TO-DO: remove
  "authorId": "1",  // TO-DO: remove
}

class RecipeAdd extends Component {
  constructor() {
    super();
    this.state = defaultState;
  }

  onChangeValue = (e) => {
    let newState = { ...this.state };
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onChangeImage = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('filename', e.target.files[0].name);
    this.setState({ imageData: data });
  }

  onChangeList = (list, name) => {
    let newState = { ...this.state };
    newState[name] = list;
    this.setState(newState);
  }

  getErrors = () => {
    const { author, authorId, title, imageData, servings, prep, 
      time, ingredients, instructions } = this.state;
    let errors = [];

    if (!authorId || !author) errors.push('an author')
    if (!title) errors.push('a title')
    if (!imageData) errors.push('an image')
    if (!servings) errors.push('servings')
    if (!prep) errors.push('prep time')
    if (!time) errors.push('full time')
    if (!ingredients) errors.push('ingredients')
    if (!instructions) errors.push('instructions')

    return errors.length ? `You must provide ${errors.join(", ")}.` : false;
  }

  submitImage = (id) => {
    let imageData = this.state.imageData;

    fetch(`/api/recipes/${id}`, {
      method: 'PUT',
      body: imageData
    }).then((res) => {
      if (!res.ok) this.setState({ error: res.error ? res.error.message : res.error });
      else {
        this.setState(defaultState);
        window.location = '/';
      }
    });
  }

  submitRecipe = (e) => {
    e.preventDefault();

    const { author, authorId, title, servings, prep, 
      time, ingredients, instructions } = this.state;
    let errors = this.getErrors();
    if (errors){
      this.setState({ error: errors });
      return;
    }

    fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, authorId, title, servings, 
        prep, time, ingredients, instructions })
    }).then(res => res.json()).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else {
        this.submitImage(res.data._id);
        this.setState({ author: '', text: '', error: null });
      }
    });
  }

  render() {
    return (
      <div className="create-recipe-container">

        <RecipeForm 
          title={ this.state.title } 
          servings={ this.state.servings }
          prep={ this.state.prep }
          time={ this.state.time }
          ingredients={ this.state.ingredients }
          instructions={ this.state.instructions }
          image={ this.state.image }
          handleChangeValue={ this.onChangeValue }
          handleChangeList={ this.onChangeList }
          handleChangeImage={ this.onChangeImage }
          handleSubmit={ this.submitRecipe } />

        { this.state.error && <p className="recipe-form-errors">{this.state.error}</p> }
      </div>
    );
  }
}

export { RecipeAdd };