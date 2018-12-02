import React, { Component } from 'react';
import Header from '../containers/Header';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <footer>익스큐즈뭬!!</footer>
      </div>
    );
  }
}
