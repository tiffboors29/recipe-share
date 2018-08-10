import axios from 'axios';

import Auth from '../../Util/Auth';
import { API_URL } from '../../Util/constants';

const auth = new Auth();

const { getAccessToken } = auth;
const headers = { 'Authorization': `Bearer ${getAccessToken()}`}

const handleData = response => response.data


export const fetchRecipes = (authorId, recipeId) => {
  if (authorId) return axios.get(`${API_URL}/api/recipes?authorId=${authorId}`, { headers }).then(handleData);
  if (recipeId) return axios.get(`${API_URL}/api/recipes/${recipeId}`, { headers }).then(handleData);
  return axios.get(`${API_URL}/api/recipes`, { headers }).then(handleData);
}

export const createRecipe = (body) => {
  return axios({
    method: 'POST',
    url: `${API_URL}/api/recipes`,
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json'
    }, 
    data: body
  }).then(handleData);
}

export const uploadRecipeImage = (recipeId, image) => {
  return axios({
    method: 'PUT',
    url: `${API_URL}/api/recipes/${recipeId}`,
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`,
    }, 
    data: image
  }).then(handleData);
}