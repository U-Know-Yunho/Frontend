import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import s from '../scss/MainCarouselView.module.scss';

export default class MainCarouselView extends Component {
  render() {
    const captionStyle = {
      color: 'white',
      background: 'transparent',
      fontSize: '1.6rem',
      //   border: '1px solid red',
      textAlign: 'left',
      textShadow: '1px 1px black',
      display: 'block',
    };
    const subCaptionStyle = {
      display: 'block',
      fontSize: '1.1rem',
      color: '#ccc',
      padding: '10px 0',
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
            신비한 동물들과 김혜비의 범죄
            <span style={subCaptionStyle}>
              Fantastic Beasts: The Crimes of Grindelwald
            </span>
          </p>
        </div>
        <div>
          <img src="https://i.ytimg.com/vi/d8Xaqr4sIX8/maxresdefault.jpg" />
          <p className="legend" style={captionStyle}>
            보헤미안 랩소디
            <span style={subCaptionStyle}>Bohemian Rhapsody</span>
          </p>
        </div>
      </Carousel>
    );
  }
}
