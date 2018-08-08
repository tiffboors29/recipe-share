import React, { Component } from 'react';

import { navigation } from './navigation';
import { Nav } from './Components/Nav';

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
        <header className="site-header">
          <Nav
            nav={ navigation }
            actionBtn={ loginBtn }
            title="What's Cookin"
            />
        </header>
      </div>
    );

  }
}

export default App;