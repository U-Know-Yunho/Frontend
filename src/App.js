import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Route exact path="/" component={HomePage} />
        </>
      </BrowserRouter>
    );
  }
}

export default App;
