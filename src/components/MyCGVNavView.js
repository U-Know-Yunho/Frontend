import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import s from '../scss/MyCGVNavView.module.scss';
import classNames from 'classnames';
import profile from '../scss/somebody.png';

export default class MyCGVNavView extends Component {
  render() {
    //   현재 url 받아오기
    const currentLocation = this.props.location.pathname;
    return (
      <>
        <div className={s.myCGVProfile}>
          <img src={profile} alt="프로필 사진" />
          <p>정윤호님</p>
        </div>
        <div className={s.myCGVMenuBox}>
          <h3 className={s.myCGVMenuTitle}>정보수정</h3>
          <Link
            to="/myCGV/info"
            className={classNames([s.myCGVMenuList], [s.info], {
              [s.myCGVFocus]: currentLocation === '/myCGV/info',
            })}
          >
            정보 변경
          </Link>
          <h3 className={s.myCGVMenuTitle}>예매내역</h3>
          <Link
            to="/myCGV"
            className={classNames([s.myCGVMenuList], {
              [s.myCGVFocus]: currentLocation === '/myCGV',
            })}
          >
            예매 내역
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
