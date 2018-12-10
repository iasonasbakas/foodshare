import React, { Component } from 'react';
import logo from './index.jpeg';
import carou from './carou.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { UncontrolledCarousel } from 'reactstrap';

const items = [
  {
    src: logo,
    altText: 'Welcome to FoodShare!',
    caption: ''
  },
  {
    src: logo,
    altText: 'Welcome to FoodShare!',
    caption: 'Explore Now'
  },
  {
    src: logo,
    altText: 'Welcome to FoodShare!',
    caption: 'Explore Now'
  }
];

class Carou extends Component {
  render() {
    return (
      <div>
        <UncontrolledCarousel items={items} />
      </div>
    )
  }
}

export default Carou;