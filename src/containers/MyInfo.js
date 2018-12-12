import React, { Component } from 'react';
import api from '../api';
import MyInfoView from '../components/MyInfoView';

export default class MyInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      lastName: '',
      firstName: '',
      email: '',
      phoneNumber: '',
    };
  }
  // 현재 로그인 중인 유저 정보 가져와서 상태에 넣어주기
  async componentDidMount() {
    const {
      data: { username, lastName, firstName, email, phoneNumber },
    } = await api.get('/api/members/profile/');

    this.setState({
      username,
      lastName,
      firstName,
      email,
      phoneNumber,
    });
  }

  handleFieldChange(e, name) {
    // name 변수에 저장되어 있는 문자열을 그대로 속성 이름으로 사용하기
    this.setState({
      [name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { password, email, phoneNumber } = this.state;

    // 비밀번호, 이메일, 핸드폰 정규표현식
    const pass = /^(?=.*\d)(?=.*[\w])(?=.*[\W]).{8,}$/gm;
    const mail = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim;
    const phone = /^\d{2,3}-\d{3,4}-\d{4}$/;
    if (!pass.test(password)) {
      alert('비밀번호는 형식에 맞게 설정해주세요.');
    } else if (!mail.test(email)) {
      alert('정확한 이메일 주소를 입력하세요');
    } else if (!phone.test(phoneNumber)) {
      alert('정확한 핸드폰 번호를 입력하세요');
    } else {
      // 정규표현식에서 걸리지 않으면 수정 요청
      try {
        await api.patch('api/members/profile/', {
          password,
          email,
          phoneNumber,
        });
        // 정보 수정이 성공적으로 되었을 때
        alert('회원정보가 성공적으로 수정되었습니다');
      } catch {
        alert('서버에서 에러가 발생했습니다');
      }
    }
  }

  render() {
    return (
      <MyInfoView
        {...this.state}
        onSubmit={e => this.handleSubmit(e)}
        onFieldChange={(e, name) => this.handleFieldChange(e, name)}
      />
    );
  }
}
