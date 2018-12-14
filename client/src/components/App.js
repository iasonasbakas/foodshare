import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// CSS Imports
import './App.css';
import './Header.css';

// JS Imports
import PostDetails from './PostDetails.js';
import NewPost from './NewPost.js';
import Posts from './Posts.js';
import Donation from './Donation.js';
import Home from './Home.js'
import About from './About.js';
import Register from './Register.js';
import AuthComponent from './Auth';

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
            <AuthComponent>
              <Route
                path="/newpost" exact
                component={NewPost}
              />
            </AuthComponent>
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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;