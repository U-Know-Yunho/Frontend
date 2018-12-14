import React, { Component } from 'react';
import AboutView from '../components/AboutView';

export default class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      memberData: [
        {
          name: '안세나',
          img: 'https://t1.daumcdn.net/cfile/tistory/271D70345287DE3F0B',
          role: 'Front-end Developer',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
        {
          name: '조서형',
          img: 'https://t1.daumcdn.net/cfile/tistory/271D70345287DE3F0B',
          role: 'Front-end Developer',
          comment: "인간에게 가장 해로운 벌레는 '대충'",
        },
        {
          name: '김혜비',
          img: 'https://t1.daumcdn.net/cfile/tistory/271D70345287DE3F0B',
          role: 'Front-end Developer',
          comment: '디자인을 좋아합니다요 외주는 저에게',
        },
        {
          name: '김성훈',
          img: 'https://t1.daumcdn.net/cfile/tistory/271D70345287DE3F0B',
          role: 'IOS Developer',
          comment: '앱개발은 저에게, 패캠출신할인있음',
        },
        {
          name: '김철규',
          img: 'https://t1.daumcdn.net/cfile/tistory/271D70345287DE3F0B',
          role: 'IOS Developer',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
        {
          name: '위성환',
          img: 'https://t1.daumcdn.net/cfile/tistory/271D70345287DE3F0B',
          role: 'IOS Developer',
          comment: '좋은데?',
        },
        {
          name: '김도향',
          img: 'https://t1.daumcdn.net/cfile/tistory/271D70345287DE3F0B',
          role: 'Back-end Developer',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
        {
          name: '전영훈',
          img: 'https://t1.daumcdn.net/cfile/tistory/271D70345287DE3F0B',
          role: 'Back-end Developer',
          comment: '인간에게 가장 해로운 벌레는 대충',
        },
      ],
    };
  }

  render() {
    return <AboutView memberData={this.state.memberData} />;
  }
}
