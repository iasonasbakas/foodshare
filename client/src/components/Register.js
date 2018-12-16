import React, { Component } from 'react';
import Header from './Header';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';

import {
  Redirect,
  Link
} from "react-router-dom";

import axios from 'axios';



const emptyUser = {
  name: '',
  surname: '',
  email: '',
  username: '',
  password: '',
  location: '',
  //photo: '',
};
class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toMain: false,
      message: '',
      user: {...emptyUser},
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   }

  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      this.setState({toMain: false, message: error.response.data});
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      console.log(error.request);
      this.setState({toMain: false, message: 'No response'});
    } else {
      // Something happened in setting up the request that
      // triggered an Error
      console.log('Error', error.message);
      this.setState({toMain: false, message: error.message});          
    }
  }
 
  componentDidMount() {
    if (!this.props.match.params.id) {
      this.setState({user: {...emptyUser}});
    } else {
      axios.get('/api/' + this.props.match.url)
        .then(response => this.setState({user: {...response.data}}))
        .catch(error => this.handleError(error));
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const newUser = {...this.state.user};

    newUser[name] = value;
    this.setState({user: newUser});
  }

  handleSubmit(event) {
    const id = this.state.user.id;
    const user = this.state.user;
    const method = this.state.user.id;
    axios(`/api/user/${id}`, {
      method: method,
      data: JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        let message = '';
        if (method === "POST") {
          message = 'User created';
        }
        this.setState({toMain: true, message });
      })
      .catch(error => this.handleError(error));
    event.preventDefault();
  }

  render() {
    if (this.state.toMain) {
      const message = this.state.message;
      return <Redirect
               to={{
                 pathname: "/",
                 state: { message }
               }}
        />;
    }
    
    const user = this.state.user;

    return (
      <div className="register">
        <Header />
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="location">Name</Label>
            <Input
              type="text"
              name="name"
              value={user.name}
              required="required"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="surname">Surname</Label>
            <Input
              type="text"
              name="surname"
              value={user.surname}
              required="required"
              onChange={this.handleInputChange}           
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={user.email}
              required="required"
              onChange={this.handleInputChange}           
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              value={user.username}
              required="required"
              onChange={this.handleInputChange}           
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              value={user.password}
              required="required"
              onChange={this.handleInputChange}              
            />
          </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            <Input
              type="text"
              name="location"
              value={user.location}
              required="required"
              onChange={this.handleInputChange}              
            />
          </FormGroup>
          <Button color="primary" type="submit">Submit</Button>
          <Link to='/'>
            <Button color="secondary">Back</Button>
          </Link>
        </Form>
        {this.state.message && 
         <Alert
           className="message"
           color="danger">
           Error<span> </span>
           {this.state.message}
         </Alert>
        }
      </div>
    );
  }
};

export default Register;
