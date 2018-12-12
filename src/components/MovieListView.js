import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withLoading from '../hoc/withLoading';
import s from '../scss/MovieListView.module.scss';
import c from 'classnames';

class MovieListView extends Component {
  render() {
    const { list, page, movie } = this.props;
    return (
      <ul className={c(s.movieList, { [s.home]: page === 'home' })}>
        {list.map((l, i) => (
          <li key={l.pk} className={s.movieItem}>
            {// movie: current이면 순위를 보여주고, upcomming이면 순위를 보여주지 않습니다.
            movie === 'current' ? <div className={s.rank}>{i + 1}</div> : null}
            <figure>
              <img
                src={l.mainImgUrl}
                alt={l.title}
                onLoad={e => console.log('load')}
              />
              <figcaption>{l.title}</figcaption>
            </figure>
            {/* <p className={s.date}>{l.openingDate}</p>
            <p className={s.score}>{l.reservationScore}</p> */}
            <div className={s.button}>
              <Link to={`/movies/detail/${l.pk}`}>상세정보</Link>
              {/* 특정 영화의 예매버튼을 클릭하여 예매하기 페이지로 접속하면
            선택한 영화의 id를 예매페이지컴포넌트에서 match.params.movieId 프롭으로 접근할 수 있도록 
            해당 주소로 보냅시다.  */}
              <Link to={`/reservation/?moviePk=${l.pk}`}>예매하기</Link>
            </div>
          </li>
        ))}
        {/* flex: space-between 마지막 줄에 아이템이 몇개 있든 윗 줄과 맞추려고 추가한 empty요소 */}
        {page === 'home' ? null : (
          <React.Fragment>
            <li className={s.empty} />
            <li className={s.empty} />
            <li className={s.empty} />
            <li className={s.empty} />
            <li className={s.empty} />
            <li className={s.empty} />
            <li className={s.empty} />
          </React.Fragment>
        )}
      </ul>
    );
  }
}

export default withLoading(MovieListView);
