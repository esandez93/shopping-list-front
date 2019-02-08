import React, { Component } from 'react';
import './SideMenu.scss';

import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignJustify,
  faLayerGroup,
  faReceipt,
  faCogs
} from '@fortawesome/free-solid-svg-icons'

import { Context } from '../../Context';

class SideMenu extends Component {
  menuOptions = [{
    key: 1,
    text: 'Lists',
    route: '/Lists',
    icon: faAlignJustify
  }, {
    key: 2,
    text: 'Groups',
    route: '/Groups',
    icon: faLayerGroup
  }, {
    key: 3,
    text: 'Recipes',
    route: '/Recipes',
    icon: faReceipt
  }, {
    key: 4,
    text: 'Options',
    route: '/Options',
    icon: faCogs
  }]

  render() {
    const offline = this.context;
    return (
      <div className={classNames("SideMenu", { "open": this.props.isOpen })}>
        <div className={classNames("menu", { "offline": offline })}>
          <div className="menu-header">
          </div>
          <div className="menu-items">
            {this.menuOptions.map((item) => (
              <Link className="menu-item" key={item.key} to={item.route} onClick={this.props.toggleMenu}>
                {item.icon ? <FontAwesomeIcon className="menu-item-icon" color="#EAEAEA" icon={item.icon} /> : null }
                {item.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="menu-backdrop" onClick={this.props.toggleMenu}></div>
      </div>
    );
  }
}

SideMenu.contextType = Context;

export default SideMenu;