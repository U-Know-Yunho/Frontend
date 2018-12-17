import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withLoading from '../hoc/withLoading';
import s from '../scss/MovieListView.module.scss';
import c from 'classnames';
import MovieItem from './MovieItem';
// import '../scss/ispinner-master/ispinner.css';

class MovieListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mobileClick: null,
    };
  }

  handleClass(pk) {
    this.setState({
      mobileClick: pk,
    });
  }

  render() {
    const { page, movie, onViewMore, list, next } = this.props;
    return (
      <React.Fragment>
        <ul className={c(s.movieList, { [s.home]: page === 'home' })}>
          {list.map((l, i) => (
            <MovieItem
              page={page}
              movie={movie}
              pk={l.pk}
              mobileClick={this.state.mobileClick}
              onClass={pk => this.handleClass(pk)}
              i={i}
              thumbImgUrl={l.thumbImgUrl}
              title={l.title}
            />
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
        {page === 'main' && next && (
          <button className={s.viewMore} onClick={() => onViewMore()}>
            더보기
          </button>
        )}
      </React.Fragment>
    );
  }
}

export default withLoading(MovieListView);
