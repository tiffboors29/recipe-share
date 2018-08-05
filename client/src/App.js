import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { nav } from './nav';
import { Header } from './Header';
import { Footer } from './Footer';
import { Recipe } from './Recipe';
import { RecipeList } from './RecipeList';
import { RecipeAdd } from './RecipeAdd';

const iconCredit = (<div className="icon-credit">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>);

class App extends Component {
  render() {

    // TO-DO: handle login (actionBtn)

    return (
      <Router>
        <div className="app">

          <Header
            nav={ nav }
            actionBtn={ { text: 'Login', path: '/' } }
            title="What's Cookin"
            />

          <div className="main">
            <Route exact path="/" component={ RecipeList }/>
            <Route path="/recipes/:id" component={ Recipe }/>
            <Route path="/add-recipe" component={ RecipeAdd }/>
          </div>

          <Footer>
            { iconCredit }
          </Footer>

        </div>
      </Router>
    )
  }
}

export default App;

