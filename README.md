This is a simple Recipe Sharing App built with the MERN ([MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), [Node](https://nodejs.org/)) stack.

User account access and authentication services are provided through [Auth0](https://auth0.com) integration.

## Frontend
The client uses [React](https://reactjs.org/) and was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). It uses [ESLint](https://eslint.org/) for linting, [Babel](https://babeljs.io/) as a JavaScript transpiler. For routing, [React Router](https://github.com/ReactTraining/react-router) is used. For authorizing a user for access, the client uses Auth0's client side JS toolkit [auth0.js](https://github.com/auth0/auth0.js). For interaction with the backend, [axios](https://github.com/axios/axios) promise based HTTP client is used.

## Backend
The server utilizes Express framework and MongoDB for data storage. [Body Parser](https://github.com/expressjs/body-parser#readme) is used as a helper in parsing network requests and [Morgan](https://github.com/expressjs/morgan) is HTTP request middleware used for logging/debugging those requests. [Mongoose](http://mongoosejs.com/) is used for MongoDB interaction. [Nodemon](https://github.com/remy/nodemon) is used to monitor and restart the server as changes are made. [Multer](https://www.npmjs.com/package/multer) is used for uploading images. [express-jwt](https://github.com/auth0/express-jwt), [jwks-rsa](https://github.com/auth0/node-jwks-rsa), and [express-jwt-authz](https://github.com/auth0/express-jwt-authz) are used to authenticate the JsonWebTokens, retrieve RSA signing keys and validate the scope in order to authorize access to an endpoint. The JsonWebTokens are passed to the backend in API requests made by the client using an Auth0 access token.

### Data Model
##### User (Auth0 user profile)
```json
{
  "email_verified": false,
  "email": "test.account@userinfo.com",
  "updated_at": "2016-12-05T15:15:40.545Z",
  "name": "test.account@userinfo.com",
  "picture": "https://s.gravatar.com/avatar/dummy.png",
  "user_id": "auth0|58454...",
  "nickname": "test.account",
  "created_at": "2016-12-05T11:16:59.640Z",
  "sub": "auth0|58454..."
}
```
##### Recipe
```json
{
  "_id": 10,
  "author": "test.account",
  "authorId": "auth0|58454...",
  "createdAt": {
    "$date": "2018-08-05T13:37:47.949Z"
  },
  "updatedAt": {
    "$date": "2018-08-05T13:37:48.113Z"
  },
  "title": "Ultimate Chocolate Chip Cookies",
  "image": {
    "data": "<Binary Data>",
    "contentType": "image/png"
  },
  "servings": 48,
  "prep": 45,
  "time": 45,
  "ingredients": [
  	"3/4 cup granulated sugar", 
  	"3/4 cup packed brown sugar", 
  	"1 cup butter or margarine, softened", 
  	"1 teaspoon vanilla", 
  	"1 egg", "2 1/4 cups all-purpose flour", 
  	"1 teaspoon baking soda", 
  	"1/2 teaspoon salt", 
  	"1 package (12 ounces) semisweet chocolate chips (2 cups)"
  ],
  "instructions": [
		"Heat oven to 375ºF", 
		"Mix sugars, butter, vanilla and egg in large bowl", 
		"Stir in flour, baking soda and salt (dough will be stiff)", 
		"Stir in chocolate chips", 
		"Drop dough by rounded tablespoonfuls about 2 inches apart onto ungreased cookie sheet", 
		"Bake 8 to 10 minutes or until light brown (centers will be soft)", 
		"Cool slightly; remove from cookie sheet. Cool on wire rack"
	]
}
```

### API Endpoints
* `/recipes`

### Authentication
The app uses Auth0 to store user accounts and authenticate API access. Within the client, the user must login through Auth0. The client then stores the access token returned and can use it to retrieve user information from Auth0 management API. In addition, the access token is used to make client-side calls to the API. The API validates the token as well as the scopes established in Auth0. Within Auth0, a "Machine to Machine" application is created to authorize the login on the clientside and a Custom API is built to be consumed by the front end. The Application must be authorized to consume the API. Additionally, scopes must be added to define what will be accessed through the application to the API.