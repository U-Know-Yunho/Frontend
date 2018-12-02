import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class MovieListView extends Component {
  render() {
    const { list } = this.props;
    return (
      <ul>
        {list.map(l => (
          <li key={l.id}>
            <figure>
              <img src=".." alt={l.title} />
              <figcaption>{l.title}</figcaption>
            </figure>
            <Link to={`/movies/detail/${l.id}`}>상세정보</Link>
            {/* 특정 영화의 예매버튼을 클릭하여 예매하기 페이지로 접속하면
            선택한 영화의 id를 예매페이지컴포넌트에서 match.params.movieId 프롭으로 접근할 수 있도록 
            해당 주소로 보냅시다.  */}
            <Link to={`/reservation/?movieId=${l.id}`}>예매하기</Link>
          </li>
        ))}
      </ul>
    );
  }
}
