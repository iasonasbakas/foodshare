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
import Header from './components/Header';

import './App.css';


const emptyDonation = {
  user: '',
  name: '',
  amount: '',
  donation_type: '',
  duration: '',
  message: '',
};

class Donation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      toMain: false,
      message: '',
      donation: {...emptyDonation},
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
      this.setState({donation: {...emptyDonation}});
    } else {
      axios.get('/api/' + this.props.match.url)
        .then(response => this.setState({post: {...response.data}}))
        .catch(error => this.handleError(error));
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const newDonation = {...this.state.donation};

    newDonation[name] = value;
    this.setState({donation: newDonation});
  }

  handleSubmit(event) {
    const id = this.state.post.id || '';
    const post = this.state.post;
    const method = this.state.post.id;
    axios(`/api/post/${id}`, {
      method: method,
      data: JSON.stringify(post),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        let message = '';
        if (method === "POST") {
          message = 'book inserted';
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
    
    const donation = this.state.donation;

    return (<Header />)
    
    return (
      <div className="donation">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="amount">Ammount</Label>
            <Input
              type="text"
              name="amount"
              value={donation.amount}
              required="required"
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              type="text"
              name="message"
              value={donation.message}
              required="required"
              onChange={this.handleInputChange}           
            />
          </FormGroup>
          <FormGroup>
            <Label for="user">User</Label>
            <Input
              type="text"
              name="user"
              value={donation.user}
              required="required"
              onChange={this.handleInputChange}           
            />
          </FormGroup>
          <FormGroup>
            <Label for="donation_type">Donation Type</Label>
            <Input
              type="text"
              name="donation_type"
              value={donation.donation_type}
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
}

export default Donation;