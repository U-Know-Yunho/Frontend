import React, { Component } from 'react';
import HeaderView from '../components/HeaderView';
import { withUser } from '../contexts/UserContext';
import { withRouter } from 'react-router-dom';

// export default withUser(HeaderView);
export default withRouter(withUser(HeaderView));
