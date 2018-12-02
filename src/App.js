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
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/movies" component={MoviePage} />
            <Route path="/reservation" component={ReservationPage} />
            <Route path="/about" component={AboutPage} />
          </>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
