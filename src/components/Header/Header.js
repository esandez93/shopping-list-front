import React, { Component } from 'react';
import './Header.scss';

import classNames from 'classnames';

import logo from '../../logo.svg';
import { Context } from '../../Context';

class Header extends Component {
  state = {
    title: 'Shopping List'
  }

  setLocation() {
    let location = this.props.location.pathname.split('/')[1];

    if (location)
      this.setState({ title: location });
  }

  componentDidMount() {
    this.setLocation();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const currentLocation = this.props.location.pathname;

    if (currentLocation !== nextProps.location.pathname || this.state.title !== nextState.title)
      return true;
    else
      return false;
  }

  componentDidUpdate(prevProps, prevState) {
    this.setLocation();
  }

  render() {
    const offline = this.context;

    return (
      <div className={classNames("Header", { 'offline': offline })}>
        <div className="header-title">
          <img src={logo} className="App-logo" alt="logo" onClick={this.props.toggleMenu} />
          <span>{this.state.title} { offline ? 'Offline' : '' }</span>
        </div>
      </div>
    );
  }
}

Header.contextType = Context;

export default Header;