import React, { Component } from 'react';
import api from '../api';
import MyInfoView from '../components/MyInfoView';
import { withUser } from '../contexts/UserContext';
import { Redirect } from 'react-router-dom';

class MyInfo extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      username: props.username,
      password: '',
      confirmPassword: '',
      lastName: props.lastName,
      firstName: props.firstName,
      email: props.email,
      phoneNumber: props.phoneNumber,
      deleteSuccess: false,
      checkedPassword: false,
    };
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

  async handleCheckPassword(e) {
    e.preventDefault();
    // const token = localStorage.getItem('token');
    const password = e.target.pass.value;
    await api.post('/api/members/check-password/', {
      password,
      // Header: {
      //   'Content-Type': 'multipart/form-data',
      // },
    });
    // 비밀번호 체크 요청이 성공하면 비밀번호 확인이 완료 된 것
    // 맞는 비밀번호를 입력했을 때 상태 바꿈
    this.setState({ checkedPassword: true });
  }

  async handleDeleteAcc() {
    // const token = localStorage.getItem('token');
    await api.delete('api/members/user-delete/');
    // 유저 정보를 db에서 지우는게 성공하면 아래 코드 실행
    this.props.deleteAcc();
    this.setState({
      deleteSuccess: true,
    });
  }
  render() {
    return this.state.deleteSuccess ? (
      <Redirect to="/" />
    ) : (
      <MyInfoView
        {...this.state}
        onSubmit={e => this.handleSubmit(e)}
        onFieldChange={(e, name) => this.handleFieldChange(e, name)}
        onCheckPassword={e => this.handleCheckPassword(e)}
        onDeleteAcc={() => this.handleDeleteAcc()}
      />
    );
  }
}

export default withUser(MyInfo);
