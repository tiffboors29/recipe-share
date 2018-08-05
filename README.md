This is a simple Recipe Sharing App built with the MERN ([MongoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), [Node](https://nodejs.org/)) stack.

User account access and authentication services are provided through [Auth0](https://auth0.com) integration.

## Frontend
The client uses [React](https://reactjs.org/) and was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). It uses [ESLint](https://eslint.org/) for linting, [Babel](https://babeljs.io/) as a JavaScript transpiler. For routing, [React Router](https://github.com/ReactTraining/react-router) is used.

## Backend
The server utilizes Express framework and MongoDB for data storage. [Body Parser](https://github.com/expressjs/body-parser#readme) is used as a helper in parsing network requests and [Morgan](https://github.com/expressjs/morgan) is HTTP request middleware used for logging/debugging those requests. [Mongoose](http://mongoosejs.com/) is used for MongoDB interaction. [Nodemon](https://github.com/remy/nodemon) is used to monitor and restart the server as changes are made.

### Data Model
##### User
```json
{
  "_id": 1234,
  "name": "Jane Doe",
  "recipes": [10, 13, 14]
}
```
##### Recipe
```json
{
  "_id": 10,
  "author": "Jane Doe",
  "authorId": 1234,
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
* `/users`

### Authentication
In Progress...