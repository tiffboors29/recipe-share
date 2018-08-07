import React, { Component } from 'react';

import { nav } from './nav';
import { Header } from './Components/Header';

class App extends Component {

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    let loginBtn = { 
      text: !isAuthenticated() ? 'Log In' : 'Log Out', 
      onClick: !isAuthenticated() ? this.login : this.logout
    }

    return (
      <div>
        <Header
          nav={ nav }
          actionBtn={ loginBtn }
          title="What's Cookin"
          />
      </div>
    );

  }
}

export default App;