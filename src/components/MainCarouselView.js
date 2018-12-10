import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import firstCarousel from './CGV_carousel_01.jpg';
import secondCarousel from './CGV_carousel_02.jpg';
import thirdCarousel from './CGV_carousel_03.jpg';

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
      opacity: '1',
    };
    const subCaptionStyle = {
      display: 'block',
      fontSize: '1.1rem',
      color: '#9c9c9c',
      padding: '10px 0',
    };
    return (
      <Carousel
        autoPlay
        showThumbs={false}
        showIndicators={false}
        infiniteLoop={true}
        interval={2500}
        stopOnHover={false}
        className={s.carouselWrapper}
      >
        <Link to="/movies/detail/10" className={s.logo}>
          <div>
            <img src={firstCarousel} alt="신비한 동물사전 영화포스터 이미지" />
            <p className="legend" style={captionStyle}>
              신비한 동물들과 그린델왈드의 범죄
              <span style={subCaptionStyle}>
                Fantastic Beasts: The Crimes of Grindelwald
              </span>
            </p>
          </div>
        </Link>
        <Link to="/movies/detail/5" className={s.logo}>
          <div>
            <img src={thirdCarousel} alt="스윙키즈 영화포스터 이미지" />
            <p className="legend" style={captionStyle}>
              스윙키즈
              <span style={subCaptionStyle}>Swing Kids</span>
            </p>
          </div>
        </Link>
        <Link to="/movies/detail/1" className={s.logo}>
          <div>
            <img src={secondCarousel} alt="보헤미안 랩소디 영화포스터 이미지" />
            <p className="legend" style={captionStyle}>
              보헤미안 랩소디
              <span style={subCaptionStyle}>Bohemian Rhapsody</span>
            </p>
          </div>
        </Link>
      </Carousel>
    );
  }
}
