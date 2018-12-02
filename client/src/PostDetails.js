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
  product_photo: '',
  expiration_date: '',
  description: '',
  location: '',
  upload_date: ''

};

class PostDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toMain: false,
      message: '',
      post: {...emptyPost},
    };
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
      this.setState({post: {...emptyPost}});
    } else {
      axios.get('/api/' + this.props.match.url)
        .then(response => this.setState({post: {...response.data}}))
        .catch(error => this.handleError(error));
    }
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

    if(post)  {
      return (
        <ul class="list-group col-md-6">
          <li class="list-group-item"> User: {post.user} </li>
          <li class="list-group-item"> Product: {post.product} </li>
          <li class="list-group-item"> Location: {post.location} </li>
          <li class="list-group-item"> Expiration date: {post.expiration_date} </li>
          <li class="list-group-item"> Upload date: {post.upload_date} </li>
          <li class="list-group-item">Time: {post.time} </li>
        </ul> 
      );
    } else {
      return (
        <div class="alert alert-warning">
          <strong>Post doesn't exist!</strong> Please try to search for another post.
        </div>
      );
    }  
  }
} 


export default PostDetails;