import React, { Component } from 'react';
import './App.css';

class PostDetails extends Component {

  searchItem(item) {
    return item.title.toLowerCase()
      .includes(this.props.searchTerm.toLowerCase());
  }

  render() {
    return (
      <div className="posts">
      <ul>
      {this.props.list.filter(item => this.searchItem(item)).map(
        item =>
        <li key={item.id}>
          <span className="badge">{item.id}</span>
          <span className="title">
            <a>{item.product}</a>
          </span>
          <button
            className="delete"
            onClick={() => this.props.onDismiss(item.id)}>
              x
            </button>
        </li>          
      )}
      </ul>
      </div>
    );
  }
}


export default PostDetail;