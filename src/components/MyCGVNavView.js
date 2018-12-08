import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from '../scss/MyCGVNavView.module.scss';
import classNames from 'classnames';

export default class MyCGVNavView extends Component {
  render() {
    const background =
      'https://t1.daumcdn.net/cfile/tistory/271D70345287DE3F0B';

    //   현재 url 받아오기
    const currentLocation = this.props.location.pathname;
    return (
      <>
        <div
          className={s.myCGVProfile}
          style={{
            backgroundImage: 'url(' + background + ')',
          }}
        />
        <div className={s.myCGVMenuBox}>
          <h3 className={s.myCGVMenuTitle}>정보수정</h3>
          <Link
            to="/myCGV/info"
            className={classNames([s.myCGVMenuList], {
              [s.myCGVFocus]: currentLocation === '/myCGV/info',
            })}
          >
            개인정보 변경
          </Link>
          <h3 className={s.myCGVMenuTitle}>예매내역</h3>
          <Link
            to="/myCGV"
            className={classNames([s.myCGVMenuList], {
              [s.myCGVFocus]: currentLocation === '/myCGV',
            })}
          >
            나의 예매 내역
          </Link>
          <Link
            to="/myCGV/history"
            className={classNames([s.myCGVMenuList], {
              [s.myCGVFocus]: currentLocation === '/myCGV/history',
            })}
          >
            내가 본 영화
          </Link>
          <Link
            to="/myCGV/canceled"
            className={classNames([s.myCGVMenuList], {
              [s.myCGVFocus]: currentLocation === '/myCGV/canceled',
            })}
          >
            취소내역
          </Link>
        </div>
      </>
    );
  }
}
