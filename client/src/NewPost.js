import React, { Component } from 'react';

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

import './App.css';


const emptyPost = {
  user: '',
  product: '',
  location: '',
  description: '',
  expiration_date: '',
  upload_date: '',
  time: ''
};

class NewPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toMain: false,
      message: '',
      post: {...emptyPost},
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
    this.setState({post: {...emptyPost}});

  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const newPost = {...this.state.post};

    newPost[name] = value;
    this.setState({post: newPost});
  }

  handleSubmit(event) {
    const id = this.state.post.id || '';
    const product = this.state.product;
    const location = this.state.location;
    const description = this.state.description;
    const expiration_date = this.state.expiration_date;
    const upload_date = this.state.upload_date;
    const time = this.state.time;
    const method = this.state.book.id ? "PUT" : "POST";
    axios(`/api/posts/${id}`, {
      method: method,
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        let message = '';
        if (method === "POST") {
          message = 'post uploaded';
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
    
    const post = this.state.post;

    return (
      <div className="post">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="location">Location</Label>
            <Input
              type="text"
              name="location"
              value={post.location}
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={post.description}
              onChange={this.handleInputChange}           
            />
          </FormGroup>
          <FormGroup>
            <Label for="expiration_date">Expiration Date</Label>
            <Input
              type="Date"
              name="expiration_date"
              value={post.expiration_date}
              onChange={this.handleInputChange}              
            />
          </FormGroup>
          <Button color="primary">Submit</Button>{' '}
          <Link to='/'>
            <Button color="secondary">Back</Button>{' '}
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
}

export default NewPost;
