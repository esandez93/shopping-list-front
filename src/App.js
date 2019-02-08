import React, { Component } from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import { Context } from './Context';
import {
  Header,
  SideMenu
} from './components';
import {
  ListsPage
} from './pages';

class App extends Component {
  state = {
    offline: false,
    isMenuOpen: false
  }

  componentWillMount() {
    window.addEventListener('online', this.setOfflineStatus);
    window.addEventListener('offline', this.setOfflineStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.setOfflineStatus);
    window.removeEventListener('offline', this.setOfflineStatus);
  }

  setOfflineStatus = () => {
    this.setState({ offline: !navigator.onLine });
  }
  
  toggleMenu = () => {
    const isMenuOpen = !this.state.isMenuOpen;
    this.setState({ isMenuOpen: isMenuOpen });
  }

  render() {
    return (
      <Router>
        <Context.Provider value={this.state.offline}>
          <div className="App">
            <Route render={(props) => <Header {...props} toggleMenu={this.toggleMenu} />} />
            <Route render={(props) => <SideMenu {...props} isOpen={this.state.isMenuOpen} toggleMenu={this.toggleMenu} />} />
            <Route exact path="/Lists" component={ListsPage} />
          </div>
        </Context.Provider>
      </Router>
    );
  }
}

export default App;