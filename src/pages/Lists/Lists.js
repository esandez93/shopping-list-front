import React, { Component } from 'react';
import '../Page.scss';
import './Lists.scss';

import classNames from 'classnames';
import axios from 'axios';

import { Loading } from '../../components';

class ShowLists extends Component {
  render() {
    return (
      this.props.lists.length === 0 ?
        <span>No lists available</span> :
        <div className="Lists">
          {this.props.lists.map((list, index) => {
            return (
              <div className="List" key={list.id}>
                <span>{list.title}</span>
                <span>{list.body}</span>
              </div>
            );
          })}
        </div>
    );
  }
}

class Lists extends Component {
  state = {
    lists: [],
    isLoading: true
  }

  componentDidMount() {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => {
        this.setState({
          lists: res.data,
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div className="ListsPage Page">
        {this.state.isLoading ?
          <Loading /> :
          <ShowLists lists={this.state.lists} />
        }
      </div>
    );
  }
}

export default Lists;