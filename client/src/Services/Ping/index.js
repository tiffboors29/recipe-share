import axios from 'axios';

import Auth from '../../Util/Auth';
import { API_URL } from '../../Util/constants';

const auth = new Auth();

const { getAccessToken } = auth;
const headers = { 'Authorization': `Bearer ${getAccessToken()}`}

const handleData = response => response.data

export const ping = (private, scoped) => {
  if (private && scoped) return axios.get(`${API_URL}/private-scoped`, { headers }).then(handleData)
  else if (private) return axios.get(`${API_URL}/private`, { headers }).then(handleData)
  return axios.get(`${API_URL}/public`).then(handleData);
}
