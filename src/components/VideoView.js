import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class VideoView extends Component {
  render() {
    const opts = {
      width: '100%',
      playerVars: {
        autoplay: 1,
      },
    };
    const { trailer } = this.props;

    return <YouTube videoId={trailer} opts={opts} onReady={this._onReady} />;
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}
