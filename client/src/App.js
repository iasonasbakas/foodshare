import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

// CSS Imports
import './App.css';
import './components/Header.css';

// JS Imports
import PostDetails from './PostDetails.js';
import NewPost from './NewPost.js';
import Posts from './Posts.js';
import Donation from './Donation.js';
import Home from './Home.js'
import Header from './components/Header.js';
import Carou from './components/Carou.js';
import About from './About.js';
import Register from './Register.js';

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
            <Route
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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;