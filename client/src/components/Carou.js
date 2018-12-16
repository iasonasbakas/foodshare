import React, { Component } from 'react';
import pic1 from './img/index.jpeg';
import { Image } from 'react-bootstrap';

import './carou.css';

class Carou extends Component {
  render() {
    return (
      <Image src={pic1} fluid/>
    )
  }
}

export default Carou;