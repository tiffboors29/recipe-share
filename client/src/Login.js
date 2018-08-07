import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    this.loginUser();
    // if (!this.pollInterval) {
    //   this.pollInterval = setInterval(this.validateUser, 2000);
    // }
  }

  componentWillUnmount() {
    // if (this.pollInterval) clearInterval(this.pollInterval);
    // this.pollInterval = null;
  }

  loginUser = () => {
    fetch('/login')
      .then(data => data.json())
      .then((res) => {
        console.log('login res: ', res);
        if (!res.success) this.setState({ error: res.error });
        else this.applyFilters(res.data);
      });
  }

  render() {

    // TO-DO: handle login (actionBtn)
    // let loggedIn = false;
    return (
      <div className="login">
        Login to continue
      </div>
    )
  }
}

export { Login };

