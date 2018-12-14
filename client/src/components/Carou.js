import React, { Component } from 'react';
import pic1 from './img/index.jpeg';
import carou from './carou.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Image } from 'react-bootstrap';

class Carou extends Component {
  render() {
    return (
      <Image src={pic1} fluid/>
    )
  }
}

export default Carou;