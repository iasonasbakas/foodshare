import React, { Component } from 'react';

import {
  Container,
  Button,
  Badge,
  ListGroup,
  ListGroupItem,
  Form,
  Input,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import Header from './Header';
import Carou from './Carou';

import { Redirect, Link } from "react-router-dom";

import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

library.add(faEye);


class Home extends Component {
  render() {
    return (
      <div classname="header">
        <Header />
        <Carou />
      </div>
    );
  }
};

export default Home;