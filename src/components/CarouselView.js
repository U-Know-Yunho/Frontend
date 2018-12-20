import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default class CarouselView extends Component {
  render() {
    const { stillcuts } = this.props;
    return (
      <Carousel
        autoPlay={true}
        showIndicators={false}
        infiniteLoop={true}
        interval={2000}
      >
        {/* map 내부 요소에는 스타일링이 안먹혀서 인라인 스타일링 줌 */}
        {stillcuts.map((s, i) => (
          <div
            key={s}
            style={{
              height: '400px',
              width: 'auto',
              background: '#302f2a',
            }}
          >
            <img
              src={s}
              style={{ height: 'inherit', width: 'inherit' }}
              alt={i}
            />
          </div>
        ))}
      </Carousel>
    );
  }
}
