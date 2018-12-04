import React, { Component } from 'react';
import './App.scss';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MovieDetailPage from './pages/MovieDetailPage';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProvider from './contexts/UserContext';
import RegisterPage from './pages/RegisterPage';
import ReservationPage from './pages/ReservationPage';
import AboutPage from './pages/AboutPage';
import SecStep from './containers/ SecStep';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route
              exact
              path="/movies/detail/:movieId"
              component={MovieDetailPage}
            />
            <Route exact path="/movies" component={MoviePage} />
            <Route path="/reservation" component={ReservationPage} />
            <Route exact path="/about" component={AboutPage} />
            {/* test 경로 (삭제 예정) */}
            <Route exact path="/sec" component={SecStep} />
          </>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
