import React, { Component } from 'react';
import './App.scss';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProvider from './contexts/UserContext';
import RegisterPage from './pages/RegisterPage';
import ReservationPage from './pages/ReservationPage';
import AboutPage from './pages/AboutPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/movies" component={MoviePage} />
            <Route exact path="/reservation" component={ReservationPage} />
            <Route exact path="/about" component={AboutPage} />
          </>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
