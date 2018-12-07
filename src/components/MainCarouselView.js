import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import s from '../scss/MainCarouselView.module.scss';

export default class MainCarouselView extends Component {
  render() {
    const captionStyle = {
      color: 'white',
      background: 'transparent',
      fontSize: '2rem',
      //   border: '1px solid red',
      textAlign: 'left',
      textShadow: '1px 1px gray',
    };
    return (
      <Carousel
        autoPlay
        showThumbs={false}
        showIndicators={false}
        infiniteLoop={true}
        interval={2000}
        className={s.carouselWrapper}
      >
        <div>
          <img src="https://t1.daumcdn.net/cfile/tistory/254300455885938421" />
          <p className="legend" style={captionStyle}>
            신비한 동물사전과 김혜비의 범죄
          </p>
        </div>
        <div>
          <img src="https://i.ytimg.com/vi/qSfnoV9ESng/maxresdefault.jpg" />
          <p className="legend" style={captionStyle}>
            Legend 2
          </p>
        </div>
      </Carousel>
    );
  }
}
