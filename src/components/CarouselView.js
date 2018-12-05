import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SlideShow from 'react-image-show';

export default class CarouselView extends Component {
  render() {
    const { stillcuts } = this.props;
    // const stillcuts = [
    //   'https://i.ytimg.com/vi/NiXtDZfo2js/maxresdefault.jpg',
    //   'https://i.ytimg.com/vi/T3eJh8k__BQ/maxresdefault.jpg',
    //   'https://brandinside.asia/wp-content/uploads/2018/11/5b80a85aabb59.jpg',
    // ];
    return (
      <SlideShow
        images={stillcuts}
        width="100%"
        imagesWidth="100%"
        imagesHeight="400px"
        imagesHeightMobile="56vw"
        thumbnailsWidth="100%"
        thumbnailsHeight="20px"
        indicators
        thumbnails
        fixedImagesHeight
      />
    );
  }
}
