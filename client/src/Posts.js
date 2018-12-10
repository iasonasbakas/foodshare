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

import {
  Redirect,
  Link
} from "react-router-dom";

import axios from 'axios';
import Header from './components/Header';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

library.add(faEye);

class Search extends Component {

  render() {
    const { searchTerm, onSearchChange } = this.props;
    return (
      <form className="Search">
        <input
          type="text"
          placeholder="search post by location"
          value={searchTerm}
          onChange={onSearchChange}
        />
      </form>
    );
  }
}

class ItemList extends Component {

  searchItem(item) {
    return item.location.toLowerCase()
      .includes(this.props.searchTerm.toLowerCase());
  }

  render() {
    return (
      <div>
        <div className="posts">
          <ListGroup>
            {this.props.list.filter(item => this.searchItem(item)).map(
              item =>
                <ListGroupItem
                  key={item.id}
                  className="justify-content-between">
                  <div className="post-item">
                    <Badge pill>{item.location}</Badge>
                    <Link 
                      to={'/posts/' + item.id}>{item.description}
                    </Link>
                  </div>
                </ListGroupItem>
            )}
          </ListGroup>
        </div>
      </div>
    );
  }
}

class PostPreview extends Component {

  render() {

    if (!this.props.post) { return null; }

    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
          <ModalHeader
            toggle={this.props.toggle}>
            Post Preview
          </ModalHeader>
          <ModalBody>
            <h5>Product</h5>
              <a href={this.props.post.profile_photo}>
                {this.props.book.product}</a>
            <h5>Expiration</h5>{this.props.post.expiration_date}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.toggle}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Alert
        className="message"
        color={this.props.color}
        isOpen={this.state.visible}
        toggle={this.onDismiss}>
        {this.props.message}
      </Alert>
    );
  }
}


class Posts extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      list: null,
      searchTerm: '',
      togglePreviewModal: false,
      bookToPreview: null,
    };
    
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
  }

  componentDidMount() {
    axios.get('/api/posts')
      .then(response =>  this.setState({list: response.data}))
      .catch(error => error);
  }

  togglePreview() {
    this.setState({
      togglePreviewModal: !this.state.togglePreviewModal
    });
  }
  
  onDismiss(id) {
    axios(`/api/posts/${id}`, {method: "DELETE"})
      .then(response => {
        const updatedList = this.state.list.filter(item => item.id !== id);
        this.setState({ list: updatedList });
      })
      .catch(error => error);
  }

  onPreview(id) {
    axios.get(`/api/posts/${id}`)
      .then(response => {
        this.setState({postToPreview: response.data});
        this.togglePreview();
      })
      .catch(error => error);    
  }
  
  onSearchChange(event) {
    // shallow merge, so list is preserved
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    
    if (!this.state.list) { return null; }

    const referrerState = this.props.location.state;
    let message = '';
    if (referrerState) {
      message = referrerState.message;
      referrerState.message = '';
    }
    const postToPreview = this.state.postToPreview;

    return(
      <div>
        <Header />
        <PostPreview
          post={postToPreview}
          modal={this.state.togglePreviewModal}
          toggle={this.togglePreview}
        />
        <Search
          value={this.searchTerm}
          onSearchChange={this.onSearchChange}
        />                          
        <ItemList
          list={this.state.list}
          searchTerm={this.state.searchTerm}
          onDismiss={this.onDismiss}
          onPreview={this.onPreview}
        />
        <div>
          <Link to='/newpost'>
            <Button color="primary">New</Button>
          </Link>
        </div>
        { message &&
          <Message
            color="success"
            message={message}
          />
        }
      </div>
    );
  }
};

export default Posts;
