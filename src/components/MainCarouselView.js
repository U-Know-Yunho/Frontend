import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import s from '../scss/MainCarouselView.module.scss';

export default class MainCarouselView extends Component {
  render() {
    return (
      <Carousel
        width="70vw"
        autoplay
        autoplayInterval={1000}
        transitionMode="fade"
      >
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6" />
      </Carousel>
    );
  }
}
