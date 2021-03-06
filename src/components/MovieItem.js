import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from '../scss/MovieListView.module.scss';
import c from 'classnames';

export default class MovieItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 기본값 true
      loading: true,
    };
  }

  handleLoading() {
    this.setState({
      loading: false,
    });
  }
  render() {
    const {
      movie,
      pk,
      mobileClick,
      onClass,
      i,
      thumbImgUrl,
      title,
      ableReserve,
      score,
      date,
    } = this.props;
    return (
      <li
        className={c(s.movieItem, {
          [s.mobileClick]: mobileClick === pk,
        })}
        onClick={() => onClass(pk)}
      >
        {// 현재상영작이면 순위를 보여주고, 개봉예정작이면 순위를 보여주지 않습니다.
        movie === 'movies' && <div className={s.rank}>{i + 1}</div>}
        <figure className={c({ [s.loaded]: this.state.loading })}>
          <img
            className={c({ [s.loaded]: this.state.loading })}
            src={thumbImgUrl}
            alt={title}
            onLoad={() => this.handleLoading()}
          />
          <figcaption>{title}</figcaption>
          {this.state.loading && (
            <div
              className={c(s.ispinner, s.ispinner__animating, s.ispinner__gray)}
            >
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
              <div className={s.ispinner__blade} />
            </div>
          )}
        </figure>
        <div className={c({ [s.info]: movie === 'movies/pre' }, s.mobileInfo)}>
          {movie === 'movies/pre' && (
            <p className={s.date}>
              <span>{date}</span> 개봉
            </p>
          )}
          <p className={s.score}>{Math.floor(score * 100)}%</p>
        </div>
        <div className={s.button}>
          <Link
            to={`/movies/detail/${pk}`}
            className={c({ [s.single]: !ableReserve })}
          >
            상세정보
          </Link>
          {/* 특정 영화의 예매버튼을 클릭하여 예매하기 페이지로 접속하면
    선택한 영화의 id를 예매페이지컴포넌트에서 match.params.movieId 프롭으로 접근할 수 있도록 
    해당 주소로 보냅시다. */}
          {ableReserve && (
            <Link to={`/reservation/?moviePk=${pk}`}>예매하기</Link>
          )}
        </div>
      </li>
    );
  }
}
