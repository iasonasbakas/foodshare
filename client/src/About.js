import React, { Component } from 'react';

import Header from './components/Header';
import { Redirect, Link } from "react-router-dom";

import axios from 'axios';

class Paragraph extends Component {

  render() {
    return (
      <div>
        <p>&nbsp;</p>
        <h2>About FoodShare</h2>
      </div>
    );
  }
}

class About extends Component {
  render() {
    return (
      <div classname="header">
        <Header />
        <Paragraph />
      </div>
    );
  }
};

export default About;
