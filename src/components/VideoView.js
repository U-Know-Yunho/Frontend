import React, { Component } from 'react';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

export default class VideoView extends Component {
  render() {
    // const { trailer } = this.props;
    const trailer = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';
    return (
      <Video
        autoPlay={false}
        loop
        muted
        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
        poster="http://sourceposter.jpg"
        onCanPlayThrough={() => {
          // Do stuff
        }}
      >
        <source src={trailer} type="video/webm" />
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          src="http://source.vtt"
          default
        />
      </Video>
    );
  }
}
