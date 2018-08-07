import axios from 'axios';

import Auth from './Auth/Auth';
import { API_URL } from './constants';

const auth = new Auth();

const { getAccessToken } = auth;
const headers = { 'Authorization': `Bearer ${getAccessToken()}`}

const handleData = response => response.data

export const ping = (secured) => {
  if (secured) return axios.get(`${API_URL}/private?scope=read:recipes`, { headers }).then(handleData)
  return axios.get(`${API_URL}/public`).then(handleData);
}

export const fetchRecipes = (authorId, recipeId) => {
  if (authorId) return axios.get(`${API_URL}/recipes?authorId=${authorId}`, { headers }).then(handleData);
  if (recipeId) return axios.get(`${API_URL}/recipes/${recipeId}`, { headers }).then(handleData);
  return axios.get(`${API_URL}/recipes`, { headers }).then(handleData);
}

export const createRecipe = (body) => {
  return axios({
    method: 'POST',
    url: `${API_URL}/recipes`,
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
    url: `${API_URL}/recipes/${recipeId}`,
    headers: {
      'Authorization': `Bearer ${getAccessToken()}`,
    }, 
    data: image
  }).then(handleData);
}