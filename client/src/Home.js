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

import Header from './components/Header';
import Carou from './components/Carou';

import {
  Redirect,
  Link
} from "react-router-dom";

import axios from 'axios';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

library.add(faEye);


class Home extends Component {

  render() {
    return (
      <React.Fragment>
        <Header />
      </React.Fragment>
    );
  }
};

export default Home;
