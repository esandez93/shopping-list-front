import React, { Component } from 'react';
import './Loading.scss';
import loading from './loading.svg';

const LoadingText = (props) => {
  let text = 'loading';
  for (let i = 0; i < props.dots; i++) {
    text += '.'
  }

  return (
    <span>{text}</span>
  );
}

let interval = null;
class Loading extends Component {
  state = {
    dots: 0
  }

  componentDidMount() {
    interval = setInterval(() => {
      const dots = this.state.dots;
      let newDots = 0;

      if (dots < 3) newDots = dots + 1;

      this.setState({ dots: newDots });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(interval);
  }

  render () {
    return (
      <div className="Loading">
        <img src={loading} className="App-loading" alt="loading" />
        <LoadingText dots={this.state.dots} />
      </div>
    );
  }
}

export default Loading;