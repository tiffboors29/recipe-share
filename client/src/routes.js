import React from 'react';
import { Route, Router, Redirect } from 'react-router-dom';

import App from './App';
import Auth from './Util/Auth';
import history from './history';

import { Home } from './Views/Home';
import { Recipe } from './Views/Recipe';
import { RecipeList } from './Views/RecipeList';
import { RecipeAdd } from './Views/RecipeAdd';

import { Callback } from './Components/Callback';
import { Footer } from './Components/Footer';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeRoutes = () => {
  const iconCredit = (<div className="icon-credit">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>);
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/" render={(props) => <Home auth={auth} {...props} />} />
          <Route exact path="/" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <RecipeList auth={auth} {...props} />
            )
          )} />
          
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>

          <Route path="/my-recipes" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <RecipeList auth={auth} author={true} {...props} />
            )
          )} />


          <Route path="/recipes/:id" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <Recipe auth={auth} {...props} />
            )
          )} />

          <Route path="/add-recipe" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/"/>
            ) : (
              <RecipeAdd auth={auth} {...props} />
            )
          )} />

          <Footer>{ iconCredit }</Footer>
        </div>
      </Router>
  );
}