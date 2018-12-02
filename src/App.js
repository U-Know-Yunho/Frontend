import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviePage} />
        </>
      </BrowserRouter>
    );
  }
}

export default App;
