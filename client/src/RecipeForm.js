import React from 'react';
import 'whatwg-fetch';
import PropTypes from 'prop-types';

import { ListInput } from './ListInput';

const RecipeForm = (props) => {

  let numberInput = {
    type: 'number',
    min: 1,
    onChange: props.handleChangeValue,
    className: 'form-control'
  };

  return (
    <form className="form-horizontal col-xs-10 col-xs-offset-1" onSubmit={ props.handleSubmit }>
      
      <div className="form-group">
        <label className="col-xs-3 control-label">Title</label>
        <div className="col-xs-9">
          <input
            className="form-control"
            type="text"
            name="title"
            placeholder="Enter Title"
            value={ props.title }
            onChange={ props.handleChangeValue }
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-xs-3 control-label">Servings</label>
        <div className="col-xs-9">
          <input
            name="servings"
            placeholder="Enter Servings"
            value={ props.servings }
            { ...numberInput }
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-xs-3 control-label">Prep Time</label>
        <div className="col-xs-9">
          <input
            name="prep"
            placeholder="Enter Prep Time"
            value={ props.prep }
            { ...numberInput }
          />
        </div>
      </div>
      <div className="form-group">
        <label className="col-xs-3 control-label">Total Time</label>
        <div className="col-xs-9">
          <input
            name="time"
            placeholder="Enter Total Time"
            value={ props.time }
            { ...numberInput }
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-xs-3 control-label">Ingredients</label>
        <div className="col-xs-9">
          <ListInput 
            name="ingredient"
            type="text"
            placeholder="Enter Ingredient"
            value={ props.ingredients }
            valueName="ingredients"
            onChange={ props.handleChangeList }
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-xs-3 control-label">Instructions</label>
        <div className="col-xs-9">
          <ListInput 
            name="instruction"
            type="text"
            placeholder="Enter Instruction"
            value={ props.instructions }
            valueName="instructions"
            onChange={ props.handleChangeList }
          />
        </div>
      </div>

      <div className="form-group">
        <label className="col-xs-3 control-label">Image</label>
        <div className="col-xs-9">
          <input
            type="file"
            name="image"
            placeholder="Upload Image"
            value={ props.image }
            onChange={ props.handleChangeImage }
          />
        </div>
      </div>

      <button className="btn btn-primary" type="submit">Submit</button>

    </form>
  );
}

RecipeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChangeValue: PropTypes.func.isRequired,
  handleChangeList: PropTypes.func.isRequired,
  handleChangeImage: PropTypes.func.isRequired,
  title: PropTypes.string,
  servings: PropTypes.number,
  prep: PropTypes.number,
  time: PropTypes.number,
  ingredients: PropTypes.array,
  instructions: PropTypes.array
};

export { RecipeForm };