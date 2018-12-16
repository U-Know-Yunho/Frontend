import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withLoading from '../hoc/withLoading';
import s from '../scss/MovieListView.module.scss';
import c from 'classnames';
// import '../scss/ispinner-master/ispinner.css';

class MovieListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileClick: null,
      load: false,
    };

    const list = this.props.list.map(l => {
      let resolve;
      const loadPromise = new Promise(r => {
        resolve = r;
      });
      return {
        ...l,
        loadPromise,
        onLoad: resolve,
      };
    });
    this.allLoadPromise = Promise.all(list.map(item => item.loadPromise));
    this.list = list;
    this.allLoadPromise.then(() =>
      this.setState({
        load: true,
      })
    );
  }

  handleClass(pk) {
    this.setState({
      mobileClick: pk,
    });
  }

  render() {
    const { page, movie } = this.props;
    return (
      <ul className={c(s.movieList, { [s.home]: page === 'home' })}>
        {this.list.map((l, i) => (
          <li
            key={l.pk}
            className={c(s.movieItem, {
              [s.mobileClick]: this.state.mobileClick === l.pk,
            })}
            onClick={() => this.handleClass(l.pk)}
          >
            {// movie: current이면 순위를 보여주고, upcomming이면 순위를 보여주지 않습니다.
            movie === 'current' ? <div className={s.rank}>{i + 1}</div> : null}
            <figure>
              <img
                className={c({ [s.loaded]: !this.state.load })}
                src={l.thumbImgUrl}
                alt={l.title}
                onLoad={() => l.onLoad()}
              />
              <figcaption>{l.title}</figcaption>
              {this.state.load ? null : (
                <div
                  className={c(
                    s.ispinner,
                    s.ispinner__animating,
                    s.ispinner__gray
                  )}
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
            {/* <p className={s.date}>{l.openingDate}</p>
            <p className={s.score}>{l.reservationScore}</p> */}
            <div className={s.button}>
              <Link to={`/movies/detail/${l.pk}`}>상세정보</Link>
              {/* 특정 영화의 예매버튼을 클릭하여 예매하기 페이지로 접속하면
            선택한 영화의 id를 예매페이지컴포넌트에서 match.params.movieId 프롭으로 접근할 수 있도록 
            해당 주소로 보냅시다. */}
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
