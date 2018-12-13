import React, { Component } from 'react';

import Header from './components/Header';
import { Redirect, Link } from "react-router-dom";

import axios from 'axios';

class SignUp extends Component {

  render() {
    return (
      <div>
        <p>&nbsp;</p>
        <h2>SignUp at FoodShare</h2>
      </div>
    );
  }
}

class Register extends Component {
  render() {
    return (
      <div classname="header">
        <Header />
        <SignUp />
      </div>
    );
  }
};

export default Register;
