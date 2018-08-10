const URL = process.env.PUBLIC_URL || 'http://localhost:5000';

export const AUTH_CONFIG = {
  domain: 'whats-cookin.auth0.com',
  clientId: 'YQiHF5AnXXqIb0TE2Q4BZH7UIdL2QqfR',
  callbackUrl: `${URL}/callback`,
  apiUrl: 'https//api.recipeshare.com'
}