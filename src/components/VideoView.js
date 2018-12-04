import React, { Component } from 'react';
import { Player } from 'video-react';

export default class VideoView extends Component {
  render() {
    // const { trailer } = this.props;
    const trailer = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';
    return (
      <Player>
        <source src={trailer} />
      </Player>
    );
  }
}
