import React, { Component } from 'react';

export default class MyMovieView extends Component {
  render() {
    const { list } = this.props;
    return (
      <div>
        {list.map(l => (
          <div>{l.screeningSet.title}</div>
        ))}
      </div>
    );
  }
}
