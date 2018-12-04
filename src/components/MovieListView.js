import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from '../scss/MovieListView.module.scss';

export default class MovieListView extends Component {
  render() {
    const { list } = this.props;
    return (
      <ul className={s.movieList}>
        {list.map(l => (
          <li key={l.pk} className={s.movieItem}>
            {// movie: current이면 순위를 보여주고, upcomming이면 순위를 보여주지 않습니다.
            this.props.movie === 'current' ? (
              <div className={s.rank}>{l.pk}</div>
            ) : null}
            <figure>
              <img src={l.main_img_url} alt={l.title} />
              <figcaption>{l.title}</figcaption>
            </figure>
            <div className={s.button}>
              <Link to={`/movies/detail/${l.pk}`}>상세정보</Link>
              {/* 특정 영화의 예매버튼을 클릭하여 예매하기 페이지로 접속하면
            선택한 영화의 id를 예매페이지컴포넌트에서 match.params.movieId 프롭으로 접근할 수 있도록 
            해당 주소로 보냅시다.  */}
              <Link to={`/reservation/?moviePk=${l.pk}`}>예매하기</Link>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
