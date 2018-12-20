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
import MyCGVPage from './pages/MyCGVPage';
import MyCGVInfoPage from './pages/MyCGVInfoPage';
import MyCGVHistoryPage from './pages/MyCGVHistoryPage';
import MyCGVCanceledPage from './pages/MyCGVCanceledPage';

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
            <Route exact path="/myCGV" component={MyCGVPage} />
            <Route exact path="/myCGV/info" component={MyCGVInfoPage} />
            <Route exact path="/myCGV/history" component={MyCGVHistoryPage} />
            <Route exact path="/myCGV/canceled" component={MyCGVCanceledPage} />
          </>
        </UserProvider>
      </BrowserRouter>
    );
  }
}

export default App;
