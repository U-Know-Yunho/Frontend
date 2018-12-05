import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default class CarouselView extends Component {
  render() {
    const { stillcuts } = this.props;
    // const stillcuts = [
    //   'https://i.ytimg.com/vi/NiXtDZfo2js/maxresdefault.jpg',
    //   'https://i.ytimg.com/vi/T3eJh8k__BQ/maxresdefault.jpg',
    //   'https://brandinside.asia/wp-content/uploads/2018/11/5b80a85aabb59.jpg',
    // ];
    return (
      <Carousel
        showArrows={true}
        // onChange={onChange}
        // onClickItem={onClickItem}
        // onClickThumb={onClickThumb}
      >
        {stillcuts.map(s => (
          <div key={s}>
            <img src={s} alt="stillcut" />
            {/* <p className="legend">Legend 1</p> */}
          </div>
        ))}
      </Carousel>
    );
  }
}
