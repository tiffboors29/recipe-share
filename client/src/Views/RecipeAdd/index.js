import React, { Component } from 'react';

import { RecipeForm } from './RecipeForm';

import { createRecipe, uploadRecipeImage } from '../../services';

class RecipeAdd extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ author: profile.nickname || profile.name, authorId: profile.sub });
      });
    } else {
      this.setState({ author: userProfile.nickname || userProfile.name, authorId: userProfile.sub });
    }
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
    uploadRecipeImage(id, this.state.imageData).then((res) => {
      if (!res.success) this.setState({ error: res.error ? res.error.message : res.error });
      else {
        this.setState({ author: this.state.author , authorId: this.state.authorId });
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

    let body = JSON.stringify({ author, authorId, title, servings, 
        prep, time, ingredients, instructions });
    createRecipe(body).then((res) => {
      if (!res.success) this.setState({ error: res.error.message || res.error });
      else {
        this.submitImage(res.data._id);
        this.setState({ author: '', text: '', error: null });
      }
    });
  }

  render() {

    return (
      <div className="main">
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
      </div>
    );
  }
}

export { RecipeAdd };