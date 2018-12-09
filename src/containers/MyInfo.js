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
      lastname: '',
      firstname: '',
      email: '',
      phonenumber: '',
    };
  }
  // 현재 로그인 중인 유저 정보 가져와서 상태에 넣어주기
  async componentDidMount() {
    // FIX: 헤더 조건 basic Auth로 설정되어있음. bearer auth로 변경 요청하기
    // const token = localStorage.getItem('token');
    // const { data } = await api.get('api/members/profile/', {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const {
      username,
      last_name: lastname,
      first_name: firstname,
      email,
      phone_number: phonenumber,
    } = {
      pk: 1,
      username: 'team4',
      password:
        'pbkdf2_sha256$120000$p8QbCth4UNV2$cUxOhFiCSNvUzcdDXHxP6YX4zs9QErSevN6tXwzGCfs=',
      last_name: '정',
      first_name: '윤호',
      email: 'test@test',
      phone_number: '010-0000-0000',
    };

    this.setState({
      username,
      lastname,
      firstname,
      email,
      phonenumber,
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
    const token = localStorage.getItem('token');
    const { password, email, phonenumber } = this.state;
    try {
      // password를 입력하지 않으면 submit요청이 일어나지 않음
      await api.patch(
        'api/members/profile/',
        {
          password,
          email,
          phonenumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // 정보 수정이 성공적으로 되었을 때
      alert('회원정보가 성공적으로 수정되었습니다');
    } catch {
      alert('정보를 정확히 입력해주세요.');
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
