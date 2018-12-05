import React, { Component } from 'react';
import CarouselView from './CarouselView';
import VideoView from './VideoView';
import s from '../scss/MovieDetail.module.scss';
import { Link } from 'react-router-dom';

export default class MovieDetailView extends Component {
  static defaultProps = {
    pk: null,
    title: '',
    director: '',
    casts: [],
    duration_min: null,
    opening_date: '',
    genre: '',
    description: '',
    trailer: '',
    reservation_score: null,
    now_show: null,
    main_img_url: '',
    stillcuts: [],
  };

  handleArray(arr) {
    let str = '';
    if (arr === []) {
      return str;
    } else {
      for (const a of arr) {
        str += a.actor.trim() + ', ';
      }
      return str.slice(0, str.length - 2);
    }
    // 왜 map이 안먹힐까
    // return casts.map(c => c.actor.trim()).join(', ');
  }

  handleImages(stillcuts) {
    let arr = [];
    for (const s of stillcuts) {
      arr.push(s.image_url);
    }
    return arr;
  }

  handleString(description) {
    let startIndex = 0;
    const str = description.split('<br>').join('');
    const arr = [];
    for (let i = 0; i < str.length; i++) {
      if (
        str[i] === '.' ||
        str[i] === '!' ||
        str[i] === '?' ||
        str[i] === '”' ||
        str[i] === '…'
      ) {
        if (
          str[i + 1] === '.' ||
          str[i + 1] === '!' ||
          str[i + 1] === '?' ||
          str[i + 1] === '”' ||
          str[i + 1] === '…'
        ) {
          continue;
        }
        const subStr = str.slice(startIndex, i + 1);
        arr.push(subStr);
        startIndex = i + 1;
      }
    }
    return arr;
  }

  render() {
    const {
      pk,
      title,
      director,
      casts,
      duration_min,
      opening_date,
      genre,
      description,
      trailer,
      reservation_score,
      now_show,
      main_img_url,
      stillcuts,
    } = this.props;

    const castsData = this.handleArray(casts);
    const descriptionData = this.handleString(description);
    const stillcutsData = this.handleImages(stillcuts);

    return (
      <div className={s.movieDetailWrapper}>
        <div className={s.movieDetailBox}>
          <h2>Movie Detail</h2>
          <div className={s.movieInfo}>
            {/* 포스터 이미지 */}
            <div className={s.posterWrapper}>
              <img
                className={s.poster}
                src={main_img_url}
                alt={`${title} 포스터`}
              />
              {/* <button> */}
              <Link to={`/reservation/?moviePk=${pk}`} className={s.button}>
                예매하기
              </Link>
              {/* </button> */}
            </div>
            <div className={s.basicInfo}>
              <h3 className={s.title}>{title}</h3>
              <span className={s.reservationScore}>
                예매율: {reservation_score}%
              </span>
              <ul>
                <li className={s.list}>감독: {director}</li>
                <li className={s.list}>
                  <span>배우: </span> <div>{castsData}</div>
                </li>
                <li className={s.list}>장르: {genre}</li>
                <li className={s.list}>기본: {duration_min}분</li>
                <li className={s.list}>개봉: {opening_date}</li>
              </ul>
            </div>
          </div>
          <div className={s.subWrapper}>
            <span className={s.subTitle}>줄거리</span>
            {descriptionData.map((d, idx) => (
              <span key={idx} className={s.descriptionLine}>
                {d}
              </span>
            ))}
          </div>
          <div className={s.subWrapper}>
            <span className={s.subTitle}>예고편</span>
            <VideoView trailer={trailer} />
          </div>
          <div className={s.subWrapper}>
            <span className={s.subTitle}>스틸컷</span>
            <CarouselView stillcuts={stillcutsData} />
          </div>
        </div>
      </div>
    );
  }
}
