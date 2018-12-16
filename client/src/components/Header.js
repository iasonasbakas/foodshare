import React, { Component } from 'react';
import logo from './img/log.jpg';
import { NavItem, NavLink } from 'reactstrap';
import { Nav, NavDropdown, Form, FormControl, Button, Navbar} from 'react-bootstrap';

import './header.css'

class Header extends Component {
  render() {
    return (
<header>
  <Navbar bg="light" expand="lg">
   <Navbar.Brand href="/">
      <img
        alt=""
        src={logo}
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
      {'FoodShare'}
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/posts">Explore</Nav.Link>
        <Nav.Link href="/donation">Donate</Nav.Link>
        <Nav.Link href="/about">About</Nav.Link>
        <Nav.Link href="/register">Sign Up</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
</header>
    )
  }
}
export default Header;