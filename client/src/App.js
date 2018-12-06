import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import PostDetails from './PostDetails.js';
import NewPost from './NewPost.js';
import Posts from './Posts.js';
import Donation from './Donation.js';
import Home from './Home.js'

class App extends Component {
 
  render() {
    return (
      <div className="container">   
        <Router className="App">
          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
              <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/posts/">Posts</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/donation/">Donation</NavLink>
            </NavItem>
              </Nav>
            </Navbar>
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
          </div>
        </Router>
      </div>
    );
  }
}

export default App;