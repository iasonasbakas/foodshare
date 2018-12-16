import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Redirect from 'react-router-dom/Redirect';
import decode from 'jwt-decode';

// CSS Imports
import './App.css';
import './header.css';

// JS Imports
import PostDetails from './PostDetails.js';
import NewPost from './NewPost.js';
import Posts from './Posts.js';
import Donation from './Donation.js';
import Home from './Home.js'
import About from './About.js';
import Register from './Register.js';
import Login from './login.js'


const checkAuth = () => {
  const token = localStorage.getItem('refreshToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (!token || !refreshToken) {
    return false;
  }

  try {
    const { exp } = decode(refreshToken);

    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
}


const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    checkAuth() ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/login'}} />
      )
  )} />
)

class App extends Component {
 
  render() {
    return (
      <div className="container">   
        <Router className="App">
          <div>
            <Route
              path="/" exact
              component={Home}
            />
            <PrivateRoute
              path="/newpost" exact
              component={NewPost}
            />
            <Route
              path="/posts/:id"
              component={PostDetails}
            /> 
            <Route
              path="/posts/" exact
              component={Posts}
            />
            <Route
              path="/donation" exact
              component={Donation}
            />
            <Route
              path="/about" exact
              component={About}
            />
            <Route
              path="/register" exact
              component={Register}
            />
            <Route
              path="/login" exact
              component={Login}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;