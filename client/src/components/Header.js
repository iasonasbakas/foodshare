import React, { Component } from 'react';
import logo from '../log.jpg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import {
  Container, Row, Col, Form, Input, Button, Navbar, Nav,
  NavbarBrand, NavLink, NavItem, UncontrolledDropdown,
  DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

class Header extends Component {
  render() {
    return (
    <header>
    <Navbar color="light" light expand="md" className="border-bottom border-gray bg-white" style={{ height: 65 }}>
        <Nav className="mrx-auto" navbar>
            
          <NavItem className="d-flex align-items-left">
            <NavLink className="font-weight-bold" tag={Link} to="/">
              <img src={logo} alt="fs" className="img-fluid rounded-circle" style={{ width: 36 }} />
            </NavLink>
          </NavItem>
              
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" tag={Link} to="/posts/">Explore</NavLink>
          </NavItem>
              
          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold" tag={Link} to="/donation/">Donate</NavLink>
          </NavItem>

          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold">About</NavLink>
          </NavItem>

          <NavItem className="d-flex align-items-center">
            <NavLink className="font-weight-bold">Sign Up</NavLink>
          </NavItem>

        </Nav>
          
        <Col className="d-none d-lg-flex justify-content-end">
          <Form inline>
            <Input type="search" className="mr-3" placeholder="Search Available Food" />
            <Button type="submit" color="info" outline>Search</Button>
          </Form>
        </Col>      
    </Navbar>
    </header>
    )
  }
}
export default Header;