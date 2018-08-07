import jwt from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import jwksRsa from 'jwks-rsa';

import dotenv from 'dotenv';

dotenv.load();

export const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: `${process.env.AUTH0_AUDIENCE}`,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

export const checkScopes = jwtAuthz([ 'read:recipes', 'create:recipes' ]);


